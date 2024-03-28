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

module.exports = { categorizedReasons };
