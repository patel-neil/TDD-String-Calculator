function Add(numbers) {
    if (!numbers || numbers.trim() === "") return 0;
  
    let delimiters = [",", "\n"];
  
    // Check for custom delimiter
    if (numbers.startsWith("//")) {
      const delimiterLineMatch = numbers.match(/^\/\/(.*)\n/);
      if (!delimiterLineMatch) throw new Error("Invalid custom delimiter format");
  
      let delimiterSection = delimiterLineMatch[1];
      numbers = numbers.slice(delimiterLineMatch[0].length); // remove delimiter line
  
      if (delimiterSection.startsWith("[") && delimiterSection.includes("]")) {
        // One or more delimiters
        const regex = /\[([^\]]+)\]/g;
        let match;
        delimiters = [];
        while ((match = regex.exec(delimiterSection)) !== null) {
          delimiters.push(match[1]);
        }
      } else {
        // Single-char delimiter
        delimiters = [delimiterSection];
      }
    }
  
    // Escape regex chars in delimiters
    const delimiterRegex = new RegExp(delimiters.map(escapeRegExp).join("|"));
    const parts = numbers.split(delimiterRegex).map(n => n.trim()).filter(n => n !== "");
    const nums = parts.map(Number);
  
    const negatives = nums.filter(n => n < 0);
    if (negatives.length > 0) {
      throw new Error("negatives not allowed: " + negatives.join(", "));
    }
  
    return nums.filter(n => n <= 1000).reduce((sum, n) => sum + n, 0);
  }
  
  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  module.exports = { Add };
  