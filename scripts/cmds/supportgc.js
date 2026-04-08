module.exports = {
  config: {
    name: "supportgc",
    version: "1.1",
    author: "Célestin",
    countDown: 5,
    role: 0,
    shortDescription: { fr: "Rejoindre le groupe de support" },
    longDescription: { fr: "Ajoute l'utilisateur au groupe officiel de support" },
    category: "Général",
    guide: { fr: "{pn}" }
  },

  onStart: async function ({ api, event, threadsData, message }) {
    const supportGroupThreadID = "1461373814973254"; // ID du groupe de support
    const botID = api.getCurrentUserID();

    try {
      // Vérifier si l'utilisateur est déjà dans le groupe
      const threadInfo = await api.getThreadInfo(supportGroupThreadID);
      const members = threadInfo.participantIDs || [];
      if (members.includes(event.senderID)) {
        return message.reply(`
🚫 Vous êtes déjà membre du groupe de support !
------------------------`);
      }

      // Ajouter l'utilisateur au groupe
      await api.addUserToGroup(event.senderID, supportGroupThreadID);

      // Message de succès
      return message.reply(`
🎉 Vous avez été ajouté avec succès au groupe de support ! 🎉
------------------------
Profitez de l'aide et des discussions !
`);
    } catch (error) {
      console.error("Erreur ajout utilisateur au groupe support :", error);

      // Message d'erreur
      return message.reply(`
❌ Impossible de vous ajouter au groupe de support. ❌
Vérifiez que vous êtes ami avec le bot et réessayez.
------------------------
`);
    }
  }
};
