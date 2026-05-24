const AnalyzerService = require('./backend/src/ai_module/services/analyzer');

// Color codes for console output
const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    bold: "\x1b[1m"
};

const SAMPLE_COMPLAINTS = [
    {
        title: "Domestic Violence Incident",
        description: "My husband beat me and threatened to kill me with a knife visible on the table. Only my child was home. I am scared."
    },
    {
        title: "Mobile Snatching",
        description: "Two men on a bike snatched my phone near the bus stop yesterday at 5 PM. It was a Samsung Galaxy."
    },
    {
        title: "Bank Fraud",
        description: "I received a call asking for OTP and now Rs 50,000 is deducted from my SBI account number 1234567890."
    },
    {
        title: "Lost Wallet",
        description: "I think I dropped my wallet somewhere in the market. It had my ID card."
    }
];

console.log(`${colors.bold}${colors.blue}=== AI MODULE VERIFICATION DEMO ===${colors.reset}\n`);

SAMPLE_COMPLAINTS.forEach((c, index) => {
    console.log(`${colors.bold}Case #${index + 1}: ${c.title}${colors.reset}`);
    console.log(`Text: "${c.description}"`);

    console.time("Analysis Time");
    const result = AnalyzerService.analyze(c.description + " " + c.title);
    console.timeEnd("Analysis Time");

    // Formatting Output
    const scoreColor = result.severity_score > 70 ? colors.red : (result.severity_score > 40 ? colors.yellow : colors.green);

    console.log(`\n${colors.bold}Analysis Results:${colors.reset}`);
    console.log(`  Severity Score:     ${scoreColor}${result.severity_score}/100${colors.reset}`);
    console.log(`  Urgency Level:      ${result.urgency_level}`);
    console.log(`  Predicted Category: ${result.predicted_category}`);
    console.log(`  Explanation:        ${result.explanation}`);
    console.log(`  Entities Found:     ${result.extracted_entities}`);
    console.log(`------------------------------------------------------------\n`);
});
