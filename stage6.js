const axios = require("axios");

const TYPE_WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function getTime(t) {
  return new Date(t).getTime();
}

async function fetchData() {
  const res = await axios.get(
    "http://4.224.186.213/evaluation-service/notifications"
  );
  return res.data.notifications;
}

function top10(data) {
  return data
    .map(n => ({
      ...n,
      weight: TYPE_WEIGHT[n.Type] || 0,
      time: getTime(n.Timestamp),
    }))
    .sort((a, b) => {
      if (b.weight !== a.weight) return b.weight - a.weight;
      return b.time - a.time;
    })
    .slice(0, 10);
}

(async () => {
  const data = await fetchData();
  const result = top10(data);

  console.log("TOP 10 NOTIFICATIONS:");
  console.log(result);
})();