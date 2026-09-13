const fs = require('fs');
const path = require('path');

class StaticResponseProvider {
  constructor(options) {
    this.options = options || {};
  }

  id() {
    return 'permission-live-response';
  }

  async callApi() {
    const filePath = path.join(__dirname, 'last-response.json');
    if (!fs.existsSync(filePath)) {
      throw new Error(
        'No captured response found. Run `npx playwright test suggested-topic.spec.ts` first.'
      );
    }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return { output: data.responseText };
  }
}

module.exports = StaticResponseProvider;
