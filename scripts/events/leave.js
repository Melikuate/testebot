const { getTime, drive } = global.utils;

module.exports = {
	config: {
		name: "leave",
		version: "1.4",
		author: "NTKhang",
		category: "events"
	},

	langs: {
		fr: {
			session1: "matin",
			session2: "midi",
			session3: "après-midi",
			session4: "soir",
			leaveType1: "a quitté",
			leaveType2: "a été expulsé",
			defaultLeaveMessage: "{userName} a quitté le groupe"
		}
	},

	onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {
		if (event.logMessageType == "log:unsubscribe")
			return async function () {
				const { threadID } = event;
				const threadData = await threadsData.get(threadID);
				if (!threadData.settings.sendLeaveMessage) return;
				const { leftParticipantFbId } = event.logMessageData;
				if (leftParticipantFbId == api.getCurrentUserID()) return;

				const threadName = threadData.threadName;
				const userName = await usersData.getName(leftParticipantFbId);

				let { leaveMessage = getLang("defaultLeaveMessage") } = threadData.data;
				const form = {
					mentions: leaveMessage.match(/\{userNameTag\}/g) ? [{
						tag: userName,
						id: leftParticipantFbId
					}] : null
				};

				// Nouveau message stylé en français avec cadre
				form.body =
`🇫🇷━━━━━━━━━━━━━━━━━━━━
💅 AU REVOIR
━━━━━━━━━━━━━━━━━━━━

⚠️ T’as quitté le groupe… mais soyons honnêtes, t’étais pas vraiment dans le style.

━━━━━━━━━━━━━━━━━
🌟 Notre devise : “Toujours au top, même quand les autres ne le sont pas.”
━━━━━━━━━━━━━━━━━━━━`;

				if (leaveMessage.includes("{userNameTag}")) {
					form.mentions = [{
						id: leftParticipantFbId,
						tag: userName
					}];
				}

				if (threadData.data.leaveAttachment) {
					const files = threadData.data.leaveAttachment;
					const attachments = files.reduce((acc, file) => {
						acc.push(drive.getFile(file, "stream"));
						return acc;
					}, []);
					form.attachment = (await Promise.allSettled(attachments))
						.filter(({ status }) => status == "fulfilled")
						.map(({ value }) => value);
				}

				message.send(form);
			};
	}
};
