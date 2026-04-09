/**
 * @Vietnamese
 * Trước tiên bạn cần có kiến thức về javascript như biến, hàm, vòng lặp, mảng, object, promise, async/await,... bạn có thể tìm hiểu thêm tại đây: https://developer.mozilla.org/en-US/docs/Web/JavaScript hoặc tại đây: https://www.w3schools.com/js/
 * Tiếp theo là kiến thức về Nodejs như require, module.exports, ... bạn có thể tìm hiểu thêm tại đây: https://nodejs.org/en/docs/
 * Và kiến thức về api không chính thức của facebook như api.sendMessage, api.changeNickname,... bạn có thể tìm hiểu thêm tại đây: https://github.com/ntkhang03/fb-chat-api/blob/master/DOCS.md
 * Nếu tên file kết thúc bằng `.eg.js` thì nó sẽ không được load vào bot, nếu muốn load vào bot thì đổi phần mở rộng của file thành `.js`
 */

/**
 * @English
 * First you need to have knowledge of javascript such as variables, functions, loops, arrays, objects, promise, async/await, ... you can learn more at here: https://developer.mozilla.org/en-US/docs/Web/JavaScript or here: https://www.w3schools.com/js/
 * Next is knowledge of Nodejs such as require, module.exports, ... you can learn more at here: https://nodejs.org/en/docs/
 * And knowledge of unofficial facebook api such as api.sendMessage, api.changeNickname,... you can learn more at here: https://github.com/ntkhang03/fb-chat-api/blob/master/DOCS.md
 * If the file name ends with `.eg.js` then it will not be loaded into the bot, if you want to load it into the bot then change the file extension to `.js`
 */

module.exports = {
	config: {
		name: "commandName",
		version: "1.1",
		author: "NTKhang x Célestin 🔥",
		category: "events"
	},

	langs: {
		vi: {
			hello: "🇫🇷━━━━━━━━━━━━\n👋 Nouveau membre détecté\n🔥 Bienvenue dans le groupe\n━━━━━━━━━━━━",
			helloWithName: "🇫🇷━━━━━━━━━━━━\n👑 Bienvenue %1\n💎 Tu entres dans un espace actif\n━━━━━━━━━━━━"
		},
		en: {
			hello: "🇫🇷━━━━━━━━━━━━\n👋 Nouveau membre détecté\n🔥 Bienvenue dans le groupe\n━━━━━━━━━━━━",
			helloWithName: "🇫🇷━━━━━━━━━━━━\n👑 Bienvenue %1\n💎 Tu entres dans un espace actif\n━━━━━━━━━━━━"
		}
	},

	onStart: async function ({ api, usersData, threadsData, message, event, userModel, threadModel, prefix, dashBoardModel, globalModel, dashBoardData, globalData, envCommands, envEvents, envGlobal, role, getLang , commandName }) {

		if (event.logMessageType == "log:subscribe") { 

			message.send(getLang("hello"));

			// message.send(getLang("helloWithName", event.logMessageData.addedParticipants[0].fullName));
		}
	}
};
