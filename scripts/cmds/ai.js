const { gpt } = require('globalsprak');

const ArYAN = [
  'ask',
  'gpt',
  'ai',
];

module.exports = {
  config: {
    name: 'ask',
    version: '1.0.1',
    author: 'ArYAN | OpenAi',
    role: 0,
    category: 'ai',
    longDescription: {
      en: 'This is a large AI language model designed to assist with a wide range of tasks.',
    },
    guide: {
      en: '\nAi < questions >\n\n🔎 𝗚𝘂𝗶𝗱𝗲\nAi what is the capital of France?',
    },
  },

  langs: {
    en: {
      final: "",
      loading: '𝖠𝗇𝗌𝗐𝖾𝗋𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍'
    }
  },

  onStart: async function () {},
  onChat: async function ({ api, event, args, getLang, message }) {
    try {
      const prefix = ArYAN.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return;
      }

      const prompt = event.body.substring(prefix.length).trim();

      const loadingMessage = getLang("loading");
      const loadingReply = await message.reply(loadingMessage);

      const response = await gpt(prompt);

      if (!response) {
        throw new Error('No response received from GPT');
      }

      const finalMsg = `${response.data.response}`;
      api.editMessage(finalMsg, loadingReply.messageID);

      console.log('Sent answer as a reply to user');
    } catch (error) {
      console.error(`Failed to get answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.`,
        event.threadID
      );
    }
  }
};
