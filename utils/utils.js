const categorizedReasons = (data) => {
  const reasonCounts = {};
  data.forEach((entry) => {
    const reason = entry.reason;
    if (reasonCounts.hasOwnProperty(reason)) {
      reasonCounts[reason]++;
    } else {
      reasonCounts[reason] = 1;
    }
  });

  return reasonCounts;
};


const daysLater = (days) => {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return result.toISOString().slice(0, 10);
};

module.exports = { categorizedReasons, daysLater };
