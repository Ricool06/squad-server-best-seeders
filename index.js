import dayjs from "dayjs";
import { got } from "got";
import { battleMetricsToken } from "./secrets";

const hntpOrg = "53164";
const hntpServer = "15099463";

const baseUrl = "https://api.battlemetrics.com";
const playerCountHistoryUrl = `${baseUrl}/servers/${hntpServer}/player-count-history`;
const playerUrl = `${baseUrl}/players`;
const sessionUrl = `${baseUrl}/servers/${hntpServer}/relationships/sessions`

const headers = {
  Authorization: `Bearer ${battleMetricsToken}`
};

// get player count history
const playerCountHistory = await got.get(playerCountHistoryUrl, {
  headers,
  searchParams: new URLSearchParams({
    "start": "2022-06-19T20:00:00.000Z",
    "stop": "2022-06-26T20:00:00.000Z",
    "resolution": "60"
  })
}).json();

const seedingPeriods = playerCountHistory.data
  .filter(({ attributes }) => attributes.min > 0 && attributes.min < 40)
  .map((p) => p.attributes.timestamp)
  .map(ts => {
    const onTheHourSeedingTime = dayjs(ts);

    return {
      "start": onTheHourSeedingTime.toISOString(),
      "stop": onTheHourSeedingTime.add(60, "minutes").toISOString(),
    }
  });

const sessionsMatrix = await Promise.all(seedingPeriods.map(async seedingPeriod => await got.get(sessionUrl, {
  headers,
  searchParams: new URLSearchParams({
    // "include": "player",
    ...seedingPeriod,
  })
}).json()));

const differenceBetweenDateTimeStrings = (sessionStart, sessionStop) => {
  return dayjs(sessionStop).diff(dayjs(sessionStart), "minutes");
}

const sessions = sessionsMatrix
  .reduce((seshes, thisDataBlock) => [...seshes, ...thisDataBlock.data], [])
  .reduce((playersToPlaytime, thisSesh) => {

    const sessionTimeDifference = differenceBetweenDateTimeStrings(
      thisSesh.attributes.start,
      thisSesh.attributes.stop
    );

    if (thisSesh.attributes.name === "x9Semo") {
      console.log(thisSesh.attributes.name);
      console.log(thisSesh.attributes.start);
      console.log(thisSesh.attributes.stop);
      console.log(sessionTimeDifference);
      console.log("----------------");
    }

    return thisSesh.attributes.name in playersToPlaytime
      ? { ...playersToPlaytime, [thisSesh.attributes.name]: playersToPlaytime[thisSesh.attributes.name] + sessionTimeDifference }
      : { ...playersToPlaytime, [thisSesh.attributes.name]: sessionTimeDifference }
    }, {});

const csv = Object
  .entries(sessions).sort((a, b) => b[1] - a[1])
  .map(row => row.join(","))
  .join("\n");

console.log(csv);
