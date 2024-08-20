
$(document).ready(() => {
    const getRandomSunTzuQuote = () => {
       
        const quotes = [
            // Invention
            "The art of war is of vital importance to the state.",
            "The supreme art of war is to subdue the enemy without fighting.",
            "Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win.",
            "He who knows when he can fight and when he cannot will be victorious.",
            "Let your plans be dark and impenetrable as night, and when you move, fall like a thunderbolt.",
            "Opportunities multiply as they are seized.",
            "In the midst of chaos, there is also opportunity.",
            "Energy may be likened to the bending of a crossbow; decision, to the releasing of a trigger.",
            "Build your opponent a golden bridge to retreat across.",
            "Great results can be achieved with small forces.",
            
            // Discovery
            "If you know the enemy and know yourself, you need not fear the result of a hundred battles.",
            "Ponder and deliberate before you make a move.",
            "All men can see these tactics whereby I conquer, but what none can see is the strategy out of which victory is evolved.",
            "To see victory only when it is within the ken of the common herd is not the acme of excellence.",
            "The wise warrior avoids the battle.",
            "Strategy without tactics is the slowest route to victory. Tactics without strategy is the noise before defeat.",
            "Know thyself, know thy enemy. A thousand battles, a thousand victories.",
            "Attack the enemy where he is unprepared, appear where you are not expected.",
            "There is no instance of a nation benefiting from prolonged warfare.",
            "Victory usually goes to the army who has better-trained officers and men.",
            
            // Sport
            "He who is prudent and lies in wait for an enemy who is not will be victorious.",
            "To fight and conquer in all your battles is not supreme excellence; supreme excellence consists in breaking the enemy's resistance without fighting.",
            "He will win who knows how to handle both superior and inferior forces.",
            "Engage people with what they expect; it is what they are able to discern and confirms their projections.",
            "Move swift as the wind and closely-formed as the wood. Attack like the fire and be still as the mountain.",
            "He will win who, prepared himself, waits to take the enemy unprepared.",
            "Opportunities multiply as they are seized.",
            "Victory usually goes to the army who has better-trained officers and men.",
            "Success in warfare is gained by carefully accommodating ourselves to the enemy's purpose.",
            "In battle, use a direct attack to engage and an indirect attack to win.",
            
            // Competition
            "The opportunity of defeating the enemy is provided by the enemy himself.",
            "Attack is the secret of defense; defense is the planning of an attack.",
            "Hold out baits to entice the enemy. Feign disorder, and crush him.",
            "He who knows when he can fight and when he cannot will be victorious.",
            "The clever combatant imposes his will on the enemy, but does not allow the enemy's will to be imposed on him.",
            "Regard your soldiers as your children, and they will follow you into the deepest valleys.",
            "He who exercises no forethought but makes light of his opponents is sure to be captured by them.",
            "If quick, I survive. If not quick, I am lost. This is ‘death.’",
            "A leader leads by example, not by force.",
            "In war, let your great object be victory, not lengthy campaigns.",
            
            // Invention
            "The quality of decision is like the well-timed swoop of a falcon which enables it to strike and destroy its victim.",
            "Speed is the essence of war.",
            "Attack him where he is unprepared, appear where you are not expected.",
            "When strong, avoid them. If of high morale, depress them. Seem humble to fill them with conceit. If at ease, exhaust them. If united, separate them. Attack their weaknesses. Emerge to their surprise.",
            "Let your plans be dark and impenetrable as night, and when you move, fall like a thunderbolt.",
            "One may know how to conquer without being able to do it.",
            "The greatest victory is that which requires no battle.",
            "He who is prudent and lies in wait for an enemy who is not will be victorious.",
            "The skillful fighter puts himself beyond the possibility of defeat.",
            "Do not repeat the tactics which have gained you one victory, but let your methods be regulated by the infinite variety of circumstances.",
            
            // Discovery
            "There are not more than five musical notes, yet the combinations of these five give rise to more melodies than can ever be heard.",
            "There are not more than five primary colors, yet in combination they produce more hues than can ever be seen.",
            "There are not more than five cardinal tastes, yet combinations of them yield more flavors than can ever be tasted.",
            "Do not repeat the tactics which have gained you one victory, but let your methods be regulated by the infinite variety of circumstances.",
            "The general who advances without coveting fame and retreats without fearing disgrace, whose only thought is to protect his country and do good service for his sovereign, is the jewel of the kingdom.",
            "It is more important to out-think your enemy, than to outfight him.",
            "When the enemy is relaxed, make them toil. When full, starve them. When settled, make them move.",
            "The best way to keep one's word is not to give it.",
            "He who advances without coveting fame and retreats without fearing disgrace, whose only thought is to protect his country and do good service for his sovereign, is the jewel of the kingdom.",
            "Knowing the enemy enables you to take the offensive, knowing yourself enables you to stand on the defensive.",
            
            // Sport
            "In the midst of chaos, there is also opportunity.",
            "Wheels of justice grind slow but grind fine.",
            "Even the finest sword plunged into salt water will eventually rust.",
            "In war, then, let your great object be victory, not lengthy campaigns.",
            "The clever combatant imposes his will on the enemy, but does not allow the enemy’s will to be imposed on him.",
            "Begin by seizing something which your opponent holds dear; then he will be amenable to your will.",
            "Move not unless you see an advantage; use not your troops unless there is something to be gained; fight not unless the position is critical.",
            "Regard your soldiers as your children, and they will follow you into the deepest valleys.",
            "If fighting is sure to result in victory, then you must fight, even though the ruler forbid it.",
            "The victorious strategist only seeks battle after the victory has been won, whereas he who is destined to defeat first fights and afterwards looks for victory.",
            
            // Competition
            "In battle, use a direct attack to engage and an indirect attack to win.",
            "The skillful warrior subdues the enemy's troops without any fighting.",
            "It is the rule in war, if our forces are ten to the enemy's one, to surround him; if five to one, to attack him; if twice as numerous, to divide our army into two.",
            "When you surround an army, leave an outlet free. Do not press a desperate foe too hard.",
            "Ponder and deliberate before you make a move.",
            "He will win who knows when to fight and when not to fight.",
            "To see victory only when it is within the ken of the common herd is not the acme of excellence.",
            "To win 100 victories in 100 battles is not the acme of skill. To subdue the enemy without fighting is the acme of skill.",
            "There is no instance of a nation benefiting from prolonged warfare.",
            "The art of war teaches us to rely not on the likelihood of the enemy's not coming, but on our own readiness to receive him; not on the chance of his not attacking, but rather on the fact that we have made our position unassailable.",
            
            // Invention
            "A skilled commander seeks victory from the situation and does not demand it of his subordinates.",
            "When strong, avoid them. If of high morale, depress them. Seem humble to fill them with conceit. If at ease, exhaust them.",
            "He who is not courageous enough to take risks will accomplish nothing in life.",
            "The best way to keep one's word is not to give it.",
            "If the mind is willing, the flesh could go on and on without many things.",
            "Victory usually goes to the army who has better-trained officers and men.",
            "Concentrate your forces on the enemy’s weakest point.",
            "The clever combatant imposes his will on the enemy, but does not allow the enemy's will to be imposed on him.",
            "Speed is the essence of war. Take advantage of the enemy’s unpreparedness; travel by unexpected routes and strike him where he has taken no precautions.",
            "If words of command are not clear and distinct, if orders are not thoroughly understood, then the general is to blame."
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
