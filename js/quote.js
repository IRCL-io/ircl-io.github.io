
$(document).ready(() => {
    const getRandomSunTzuQuote = () => {
       
        const quotes = [
            "All warfare is based on deception.",
            "In the midst of chaos, there is also opportunity.",
            "Know thyself, know thy enemy. A thousand battles, a thousand victories.",
            "The supreme art of war is to subdue the enemy without fighting.",
            "Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win.",
            "He who knows when he can fight and when he cannot will be victorious.",
            "The greatest victory is that which requires no battle.",
            "Appear weak when you are strong, and strong when you are weak.",
            "If your opponent is of choleric temper, seek to irritate him.",
            "The opportunity of defeating the enemy is provided by the enemy himself.",
            "Attack is the secret of defense; defense is the planning of an attack.",
            "Let your plans be dark and impenetrable as night, and when you move, fall like a thunderbolt.",
            "Opportunities multiply as they are seized.",
            "Engage people with what they expect; it is what they are able to discern and confirms their projections.",
            "Energy may be likened to the bending of a crossbow; decision, to the releasing of a trigger.",
            "Ponder and deliberate before you make a move.",
            "The wise warrior avoids the battle.",
            "Plan for what is difficult while it is easy, do what is great while it is small.",
            "He who is prudent and lies in wait for an enemy who is not will be victorious.",
            "If the mind is willing, the flesh could go on and on without many things.",
            "If you know the enemy and know yourself, you need not fear the result of a hundred battles.",
            "If quick, I survive. If not quick, I am lost. This is 'death.'",
            "When the enemy is relaxed, make them toil. When full, starve them. When settled, make them move.",
            "A leader leads by example, not by force.",
            "Pretend inferiority and encourage his arrogance.",
            "The quality of decision is like the well-timed swoop of a falcon which enables it to strike and destroy its victim.",
            "Speed is the essence of war.",
            "Strategy without tactics is the slowest route to victory. Tactics without strategy is the noise before defeat.",
            "To know your enemy, you must become your enemy.",
            "Move swift as the Wind and closely-formed as the Wood. Attack like the Fire and be still as the Mountain.",
            "Great results can be achieved with small forces.",
            "He who advances without coveting fame and retreats without fearing disgrace, whose only thought is to protect his country and do good service for his sovereign, is the jewel of the kingdom.",
            "Build your opponent a golden bridge to retreat across.",
            "He will win who knows how to handle both superior and inferior forces.",
            "Do not press an enemy at bay.",
            "One may know how to conquer without being able to do it.",
            "He who is not courageous enough to take risks will accomplish nothing in life.",
            "The general who advances without coveting fame and retreats without fearing disgrace, whose only thought is to protect his country and do good service for his sovereign, is the jewel of the kingdom.",
            "There is no instance of a nation benefiting from prolonged warfare.",
            "The skillful fighter puts himself beyond the possibility of defeat.",
            "Do not repeat the tactics which have gained you one victory, but let your methods be regulated by the infinite variety of circumstances.",
            "Attack the enemy where he is unprepared, appear where you are not expected.",
            "He who can modify his tactics in relation to his opponent and thereby succeed in winning, may be called a heaven-born captain.",
            "If his forces are united, separate them.",
            "The best way to keep one's word is not to give it.",
            "Those who are skilled in combat do not become angered, those who are skilled at winning do not become afraid. Thus the wise win before they fight, while the ignorant fight to win.",
            "You have to believe in yourself.",
            "If you are far from the enemy, make him believe you are near.",
            "Convince your enemy that he will gain very little by attacking you; this will diminish his enthusiasm.",
            "Hold out baits to entice the enemy. Feign disorder, and crush him.",
            "If the enemy leaves a door open, you must rush in.",
            "Wheels of justice grind slow but grind fine.",
            "Even the finest sword plunged into salt water will eventually rust.",
            "When strong, avoid them. If of high morale, depress them. Seem humble to fill them with conceit. If at ease, exhaust them. If united, separate them. Attack their weaknesses. Emerge to their surprise.",
            "Do not engage an enemy more powerful than you. And if it is unavoidable and you do engage, then make sure your forces are properly deployed.",
            "Victory usually goes to the army who has better-trained officers and men.",
            "Attack him where he is unprepared, appear where you are not expected.",
            "We cannot enter into alliances until we are acquainted with the designs of our neighbors.",
            "Knowing the enemy enables you to take the offensive, knowing yourself enables you to stand on the defensive.",
            "If the enemy know not where he will be attacked, he must prepare in every quarter, and so be everywhere weak.",
            "When we are near, we must make the enemy believe we are far away; when far away, we must make him believe we are near.",
            "Regard your soldiers as your children, and they will follow you into the deepest valleys.",
            "He will win who knows when to fight and when not to fight.",
            "A skilled commander seeks victory from the situation and does not demand it of his subordinates.",
            "Do not pursue an enemy who simulates flight; do not attack soldiers whose temper is keen.",
            "Success in warfare is gained by carefully accommodating ourselves to the enemy's purpose.",
            "Move not unless you see an advantage; use not your troops unless there is something to be gained; fight not unless the position is critical.",
            "A good commander is benevolent and unconcerned with fame.",
            "If the enemy knows not where he will be attacked, he must prepare in every quarter, and so be everywhere weak.",
            "In war, then, let your great object be victory, not lengthy campaigns.",
            "Therefore the skillful leader subdues the enemy's troops without any fighting; he captures their cities without laying siege to them; he overthrows their kingdom without lengthy operations in the field.",
            "The clever combatant imposes his will on the enemy, but does not allow the enemy's will to be imposed on him.",
            "He will win who, prepared himself, waits to take the enemy unprepared.",
            "One mark of a great soldier is that he fight on his own terms or fights not at all.",
            "Victory is reserved for those who are willing to pay its price.",
            "Rewards for good service should not be deferred a single day.",
            "To see victory only when it is within the ken of the common herd is not the acme of excellence.",
            "Concentrate your forces on the enemy’s weakest point.",
            "Begin by seizing something which your opponent holds dear; then he will be amenable to your will.",
            "The consummate leader cultivates the moral law and strictly adheres to method and discipline; thus it is in his power to control success.",
            "The principle on which to manage an army is to set up one standard of courage which all must reach.",
            "To win 100 victories in 100 battles is not the acme of skill. To subdue the enemy without fighting is the acme of skill.",
            "What the ancients called a clever fighter is one who not only wins, but excels in winning with ease.",
            "It is more important to out-think your enemy, than to outfight him.",
            "There are five dangerous faults which may affect a general: Recklessness, which leads to destruction; cowardice, which leads to capture; a hasty temper, which can be provoked by insults; a delicacy of honor which is sensitive to shame; over-solicitude for his men, which exposes him to worry and trouble.",
            "He who exercises no forethought but makes light of his opponents is sure to be captured by them.",
            "If fighting is sure to result in victory, then you must fight, even though the ruler forbid it; if fighting will not result in victory, then you must not fight even at the ruler's bidding.",
            "Plan all the way to the end.",
            "The victorious strategist only seeks battle after the victory has been won, whereas he who is destined to defeat first fights and afterwards looks for victory.",
            "In battle, use a direct attack to engage and an indirect attack to win.",
            "A skilled commander seeks victory from the situation, rather than demanding it of his subordinates.",
            "Therefore those skilled in war bring the enemy to the field of battle and are not brought there by him.",
            "If words of command are not clear and distinct, if orders are not thoroughly understood, then the general is to blame.",
            "When strong, avoid them. If of high morale, depress them.",
            "Speed is the essence of war. Take advantage of the enemy’s unpreparedness; travel by unexpected routes and strike him where he has taken no precautions.",
            "For to win one hundred victories in one hundred battles is not the acme of skill. To subdue the enemy without fighting is the acme of skill.",
            "One mark of a great soldier is that he fight on his own terms or fights not at all.",
            "Leadership is a matter of intelligence, trustworthiness, humaneness, courage, and sternness.",
            "Strategy without tactics is the slowest route to victory. Tactics without strategy is the noise before defeat.",
            "Great results can be achieved with small forces."
        ];

        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    };

    const displayQuote = (elementId, quote) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = quote;
        } else {
            console.error(`Element with ID "${elementId}" not found.`);
        }
    };

    const randomQuote = getRandomSunTzuQuote();
    displayQuote("quotible", randomQuote);
});
