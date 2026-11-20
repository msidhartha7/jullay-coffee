/**
 * The cafe library, copied from the "Book Collection Inventory" Google Sheet
 * (sheet: Book Inventory). Edit here, then redeploy.
 */

export type Shelf = { id: string; name: string };
export type LibraryBook = { title: string; author: string; shelf: string; about: string };

export const shelves: Shelf[] = [
  { id: 'window', name: 'Top window shelf' },
  { id: 'tall', name: 'Tall narrow bookshelf' },
  { id: 'upper', name: 'Upper wall shelf' },
  { id: 'lower', name: 'Middle and lower wall shelves' },
];

export const books: LibraryBook[] = [
  // Top Window Shelf
  { shelf: 'window', title: 'Just Another Kid', author: 'Torey Hayden', about: 'A non-fiction account from child psychologist and special education teacher Torey Hayden exploring the lives, struggles, and growth of troubled youth and the adults working to support them.' },
  { shelf: 'window', title: 'See Me', author: 'Nicholas Sparks', about: 'A romantic suspense novel following a man trying to turn his life around after a troubled past and a woman whose life is upended by a stalker.' },
  { shelf: 'window', title: 'Chasing Tomorrow', author: "Tilly Bagshawe (Sidney Sheldon's Tracy Whitney)", about: 'A fast-paced thriller continuing the story of Tracy Whitney as she faces danger, secrets, and high-stakes choices.' },
  { shelf: 'window', title: 'Family Wisdom', author: 'Robin Sharma', about: 'A motivational fable and self-help guide focusing on parenting, leadership at home, and living a balanced, values-driven life.' },
  { shelf: 'window', title: 'The Last Olympian', author: 'Rick Riordan', about: 'The fifth and final book in the original Percy Jackson & the Olympians fantasy series, culminating in a battle to defend Mount Olympus and New York City.' },
  { shelf: 'window', title: 'A Discovery of Witches', author: 'Deborah Harkness', about: 'The first book in the All Souls trilogy, where a scholar and reluctant witch uncovers a mysterious manuscript at Oxford and crosses paths with a vampire.' },
  { shelf: 'window', title: 'A Kept Woman', author: 'Louise Bagshawe', about: 'A commercial drama about a glamorous woman whose privileged life in New York suddenly unravels, forcing her to build independence from scratch.' },
  { shelf: 'window', title: 'The Sky Is Falling', author: 'Sidney Sheldon', about: 'A suspense thriller centered on a television anchorwoman investigating a string of high-profile deaths and hidden conspiracies.' },
  { shelf: 'window', title: 'True Believer', author: 'Nicholas Sparks', about: 'A romance novel about a skeptical science writer who travels to a small North Carolina town to investigate paranormal claims and falls for a local woman.' },
  { shelf: 'window', title: 'Twenties Girl', author: 'Sophie Kinsella', about: 'A lighthearted romantic comedy about a twenty-something woman who starts being visited by the lively ghost of her late great-aunt.' },
  { shelf: 'window', title: 'Nothing Lasts Forever', author: 'Sidney Sheldon', about: 'A medical thriller following three female doctors navigating high-stakes hospital drama, career pressures, and a murder accusation.' },
  { shelf: 'window', title: 'The Doomsday Conspiracy', author: 'Sidney Sheldon', about: 'A conspiracy thriller in which a naval officer investigates a mysterious crash in the Alps and uncovers a deadly cover-up.' },
  { shelf: 'window', title: 'Nemesis', author: 'Bill Napier', about: 'A science-fiction/techno-thriller about an impending asteroid threat and the race to stop a catastrophe.' },
  { shelf: 'window', title: 'Perfect Skin', author: 'Nick Earls', about: 'A humorous, character-driven contemporary novel following a man in his thirties reflecting on adulthood, relationships, and changing times.' },
  { shelf: 'window', title: 'The Immortals of Meluha', author: 'Amish Tripathi', about: 'The first book in the Shiva Trilogy, reimagining Lord Shiva as a Tibetan tribal leader brought to the ancient land of Meluha.' },

  // Tall Narrow Bookshelf
  { shelf: 'tall', title: 'WILL', author: 'Will Smith with Mark Manson', about: "The actor and musician's candid memoir tracing his upbringing, career highs and lows, and personal growth." },
  { shelf: 'tall', title: 'Odyssey', author: 'Stephen Fry', about: 'Stephen Fry’s accessible, witty retelling of Homer’s classic Greek epic following Odysseus’s long journey home after the Trojan War.' },
  { shelf: 'tall', title: 'Witch Hunt', author: 'Ian Rankin', about: 'A crime novel featuring Detective Inspector John Rebus investigating a complex case involving high-level secrets and past misdeeds.' },
  { shelf: 'tall', title: "River's End", author: 'Nora Roberts', about: 'A romantic suspense novel blending family mysteries, small-town dynamics, and thriller elements.' },
  { shelf: 'tall', title: 'The Lazarus Vendetta', author: 'Robert Ludlum', about: 'An espionage thriller revolving around secret societies, hidden identities, and high-stakes intrigue.' },
  { shelf: 'tall', title: 'The Jungle Book', author: 'Rudyard Kipling', about: 'Classic stories following Mowgli, a boy raised by wolves in the Indian jungle, alongside animal fables.' },
  { shelf: 'tall', title: 'Cold Mountain', author: 'Charles Frazier', about: 'A historical novel set during the American Civil War following a wounded Confederate soldier trying to return home to the woman he loves.' },
  { shelf: 'tall', title: 'Caste: The Origins of Our Discontents', author: 'Isabel Wilkerson', about: 'A non-fiction examination of social hierarchy and caste systems, drawing parallels across the United States, India, and Nazi Germany.' },
  { shelf: 'tall', title: 'Born to Run', author: 'Christopher McDougall', about: 'A non-fiction adventure book exploring endurance running, human physiology, and the Tarahumara (Rarámuri) people.' },
  { shelf: 'tall', title: 'The Scorch Trials', author: 'James Dashner', about: 'The second book in The Maze Runner dystopian sci-fi series, following the Gladers across a scorched, post-apocalyptic landscape.' },

  // Upper Wall Shelf
  { shelf: 'upper', title: 'Easy Interval Method', author: 'Klaas Lok', about: 'A practical guide focused on structured interval training and running improvement.' },
  { shelf: 'upper', title: 'Host', author: 'Robin Cook', about: 'A medical thriller typical of Robin Cook’s work, blending healthcare settings with suspense and mystery.' },
  { shelf: 'upper', title: "Tomorrow's Rainbow", author: 'Ara Hylton', about: 'A memoir reflecting on grief, resilience, and moving forward after loss.' },
  { shelf: 'upper', title: 'Custody', author: 'Manju Kapur', about: 'A family drama set in India exploring marriage, divorce, motherhood, and the emotional toll of a child custody battle.' },
  { shelf: 'upper', title: 'Circle of Fear', author: '', about: 'A suspense/thriller novel centered on fear, betrayal, and psychological tension.' },
  { shelf: 'upper', title: 'Flash Boys', author: 'Michael Lewis', about: 'A non-fiction financial book investigating high-frequency trading and how modern stock markets operate behind the scenes.' },
  { shelf: 'upper', title: "Obama's Wars", author: 'Bob Woodward', about: 'A non-fiction political account examining decision-making inside the Obama administration regarding the war in Afghanistan.' },
  { shelf: 'upper', title: 'The Football Fact Book', author: 'Various', about: 'A reference/trivia book packed with statistics, history, and records from the world of football/soccer.' },
  { shelf: 'upper', title: 'Imagining India', author: 'Nandan Nilekani', about: 'A non-fiction book exploring India’s demographic shifts, economic growth, technology, and future challenges.' },
  { shelf: 'upper', title: 'Death Benefit', author: 'Robin Cook', about: 'A medical thriller involving corporate/healthcare intrigue and deadly consequences.' },
  { shelf: 'upper', title: 'Intervention', author: 'Robin Cook', about: 'Another medical suspense novel by Robin Cook tackling high-stakes secrets in medicine.' },

  // Middle & Lower Wall Shelves
  { shelf: 'lower', title: 'The Magic of Thinking Big', author: 'David J. Schwartz', about: 'A classic self-help and personal development book focused on goal-setting, confidence, and positive mindset habits.' },
  { shelf: 'lower', title: 'The Hunger Games', author: 'Suzanne Collins', about: 'The dystopian YA novel where teenagers compete in a televised fight to the death in the nation of Panem.' },
  { shelf: 'lower', title: "It's Not About the Bike", author: 'Lance Armstrong', about: 'A memoir recounting his return to competitive cycling after a cancer diagnosis.' },
  { shelf: 'lower', title: 'The Two Towers', author: 'J.R.R. Tolkien', about: 'The second volume of The Lord of the Rings high-fantasy epic.' },
  { shelf: 'lower', title: 'A Wrinkle in Time', author: "Madeleine L'Engle", about: 'A classic sci-fi/fantasy adventure following Meg Murry as she travels through space and time to rescue her father.' },
  { shelf: 'lower', title: 'A New Earth', author: 'Eckhart Tolle', about: 'A spiritual self-help book examining ego, consciousness, and finding inner peace.' },
  { shelf: 'lower', title: 'English, August', author: 'Upamanyu Chatterjee', about: 'A cult-classic Indian English novel about a young civil servant posted to a sleepy small town and his existential reflections.' },
  { shelf: 'lower', title: 'The Silk Roads: A New History of the World', author: 'Peter Frankopan', about: 'A sweeping historical non-fiction book tracing trade, empires, and cultural exchange across Eurasia.' },
  { shelf: 'lower', title: 'The Secret', author: 'Rhonda Byrne', about: 'A self-help book popularizing the "law of attraction" and positive thinking to shape one\'s life.' },
  { shelf: 'lower', title: 'Map of Bones', author: 'James Rollins', about: 'An action-adventure thriller blending science, history, and secret societies.' },
  { shelf: 'lower', title: 'Love Story', author: 'Erich Segal', about: 'A classic romantic tragedy about two college students from very different backgrounds who fall in love.' },
  { shelf: 'lower', title: 'Gates of Paradise', author: 'V.C. Andrews', about: 'A gothic family drama continuing the Casteel series.' },
  { shelf: 'lower', title: 'The Power of Habit', author: 'Charles Duhigg', about: 'A non-fiction book on how habits form in individuals and organizations and how they can be changed.' },
];

/** A stable look for each spine, from its title. */
export function spineStyle(title: string) {
  let h = 0;
  for (const ch of title) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const palette: [string, string][] = [
    ['#6b7830', '#fefdfb'], ['#576544', '#fefdfb'], ['#3c4128', '#f8eacf'], ['#f8eacf', '#1c1a14'],
    ['#e0cfbc', '#1c1a14'], ['#b49a7c', '#1c1a14'], ['#1c1a14', '#f8eacf'], ['#fefdfb', '#1c1a14'],
  ];
  const [bg, fg] = palette[h % palette.length];
  return { bg, fg, height: 72 + (h % 27), width: 30 + ((h >> 5) % 18) };
}
