type Language = {
	navbar: string;
};

type LangStringList = {
	[key: string]: any;
};

export const strings: LangStringList = {
	en: {
		homePage: {
			title: "Coloring book",
			start: "Start",
			altImgRabbit: "Rabbit",
			altImgRabbitLeg: "Rabbit leg",
		},
		gameSelectPage: {
			allAnimals: "All animals",
			wildAnimals: "Wild animals",
			domesticAnimals: "Domestic animals",
		},
		settingsPage: {
			en: "English",
			hr: "Croatian",
			de: "German",
			sound: "Sound",
		},
		errorPage: {
			notFound: "Page not found",
		},
	},
	hr: {
		homePage: {
			title: "Bojanka",
			start: "Započni",
			altImgRabbit: "Zec",
			altImgRabbitLeg: "Zečeva noga",
		},
		gameSelectPage: {
			allAnimals: "Sve životinje",
			wildAnimals: "Divlje životinje",
			domesticAnimals: "Domaće životinje",
		},
		settingsPage: {
			en: "Engleski",
			hr: "Hrvatski",
			de: "Njemački",
			sound: "Zvuk",
		},
		errorPage: {
			notFound: "Stranica nije pronađena",
		},
	},
	de: {
		homePage: {
			title: "Malbuch",
			start: "Starten",
			altImgRabbit: "Hase",
			altImgRabbitLeg: "Das Bein vom Hasen",
		},
		gameSelectPage: {
			allAnimals: "Alle Tiere",
			wildAnimals: "Wildtiere",
			domesticAnimals: "Haustiere",
		},
		settingsPage: {
			en: "Englisch",
			hr: "Kroatisch",
			de: "Deutsch",
			sound: "Ton",
		},
		errorPage: {
			notFound: "Seite nicht gefunden",
		},
	},
};
