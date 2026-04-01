const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

function fancy(text) {
  const map = {
    A: '𝒜', B: 'ℬ', C: '𝒞', D: '𝒟', E: 'ℰ', F: 'ℱ',
    G: '𝒢', H: 'ℋ', I: 'ℐ', J: '𝒥', K: '𝒦', L: 'ℒ',
    M: 'ℳ', N: '𝒩', O: '𝒪', P: 'ℙ', Q: '𝒬', R: 'ℛ',
    S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳',
    Y: '𝒴', Z: '𝒵',
    a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: 'ℯ', f: '𝒻',
    g: 'ℊ', h: '𝒽', i: '𝒾', j: '𝒿', k: '𝓀', l: '𝓁',
    m: '𝓂', n: '𝓃', o: 'ℴ', p: '𝓅', q: '𝓆', r: '𝓇',
    s: '𝓈', t: '𝓉', u: '𝓊', v: '𝓋', w: '𝓌', x: '𝓍',
    y: '𝓎', z: '𝓏'
  };
  return text.split('').map(c => map[c] || c).join('');
}

const catEmoji = {
  system: "⚙️",
  fun: "🎉",
  anime: "🌸",
  economy: "💰",
  game: "🎮",
  image: "🖼️",
  ai: "🤖",
  owner: "👑",
  media: "📀",
  love: "💖",
  group: "👥",
  contact: "📞",
  tools: "🛠️",
  youtube: "🎵",
  default: "📖"
};

module.exports = {
  config: {
    name: "help",
    aliases: ["h"],
    version: "2.0",
    author: "Celestin 🔮",
    role: 0,
    category: "system",
    guide: "{pn} [commande]"
  },

  onStart: async ({ message, args, event, role }) => {
    const prefix = await getPrefix(event.threadID);

    if (!args[0]) {
      const cats = {};
      for (const [name, cmd] of commands) {
        if (cmd.config.role > role) continue;
        const cat = cmd.config.category || "OTHER";
        if (!cats[cat]) cats[cat] = [];
        cats[cat].push(name);
      }

      let screen = "";
      for (const cat of Object.keys(cats).sort()) {
        const emoji = catEmoji[cat.toLowerCase()] || catEmoji.default;
        screen += `╔══════════════════════╗\n`;
        screen += `║ ${emoji} ${fancy(cat.toUpperCase())} ║\n`;
        screen += `╚══════════════════════╝\n`;
        cats[cat].sort().forEach(c => {
          screen += `• ${fancy(c)}\n`;
        });
        screen += "\n";
      }

      screen += `🔥 TOTAL COMMANDES : ${commands.size}\n`;
      screen += `💚 PREFIX : ${prefix}`;

      const sent = await message.reply(screen);
      setTimeout(() => message.unsend(sent.messageID), 30000);
      return;
    }

    const name = args[0].toLowerCase();
    const cmd = commands.get(name) || commands.get(aliases.get(name));

    if (!cmd) {
      const sent = await message.reply(`❌ COMMANDE INTROUVABLE`);
      setTimeout(() => message.unsend(sent.messageID), 15000);
      return;
    }

    const cfg = cmd.config;
    const usage = (cfg.guide?.replace("{pn}", prefix) || `${prefix}${cfg.name}`);

    const detail = `╔══════════════════════╗
║ 🔹 ${fancy(cfg.name.toUpperCase())} 🔹
╠══════════════════════╣
║ Version : ${cfg.version}
║ Role : ${cfg.role}
║ Catégorie : ${cfg.category || "AUTRE"}
║ Usage : ${usage}
╚══════════════════════╝`;

    const sent = await message.reply(detail);
    setTimeout(() => message.unsend(sent.messageID), 20000);
  }
};
