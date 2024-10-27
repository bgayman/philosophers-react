import { v4 as uuidv4 } from 'uuid';

export class Hashtag {
    tag: string;
    description: string;
    id: string;

    static all: Hashtag[] = [
        new Hashtag("one", "Central to discussions of identity, unity, and singularity in metaphysics."),
        new Hashtag("will", "Central to discussions of free will and determinism."),
        new Hashtag("life", "A fundamental topic in philosophy, particularly in ethics, existentialism, and metaphysics."),
        new Hashtag("world", "Central in metaphysics and discussions about reality and perception."),
        new Hashtag("other", "Relates to alterity and the concept of “the Other,” crucial in existentialism and phenomenology."),
        new Hashtag("men", "Often used in discussions of human nature, ethics, and politics."),
        new Hashtag("being", "Central to ontology and metaphysics, focusing on existence itself."),
        new Hashtag("human", "Central to discussions of human nature, ethics, and personhood."),
        new Hashtag("things", "Reflects objects of experience, key in phenomenology and metaphysics."),
        new Hashtag("nothing", "Central in existentialism and metaphysical discussions about the void or non-existence."),
        new Hashtag("power", "Key topic in political philosophy and discussions of authority."),
        new Hashtag("truth", "One of the central concepts in epistemology and philosophy of language."),
        new Hashtag("good", "Central to discussions of morality and ethics."),
        new Hashtag("god", "Fundamental topic in philosophy of religion and metaphysics."),
        new Hashtag("reason", "Central to epistemology, logic, and philosophy of mind."),
        new Hashtag("nature", "Central to discussions in metaphysics, ethics, and philosophy of science."),
        new Hashtag("philosophy", "Directly relevant, as it refers to the love of wisdom and the study of fundamental questions."),
        new Hashtag("right", "Central to discussions of ethics, morality, and political philosophy."),
        new Hashtag("knowledge", "Fundamental in epistemology, the study of knowledge."),
        new Hashtag("society", "Key topic in social and political philosophy."),
        new Hashtag("freedom", "Fundamental concept in political philosophy and existentialism."),
        new Hashtag("just", "Refers to fairness, key in discussions of justice and ethics."),
        new Hashtag("end", "Central to discussions of purpose and teleology."),
        new Hashtag("know", "Central to epistemology, concerning knowledge and belief."),
        new Hashtag("time", "Fundamental in metaphysics and philosophy of time."),
        new Hashtag("state", "Key concept in political philosophy and metaphysics."),
        new Hashtag("history", "Central in philosophy of history and historical epistemology."),
        new Hashtag("mind", "Central in philosophy of mind and discussions of consciousness."),
        new Hashtag("force", "Important in metaphysics and philosophy of science."),
        new Hashtag("order", "Central to political philosophy and metaphysics."),
        new Hashtag("government", "Key topic in political philosophy."),
        new Hashtag("fact", "Central to discussions of truth and epistemology."),
        new Hashtag("law", "Fundamental to legal and political philosophy."),
        new Hashtag("science", "Key topic in philosophy of science."),
        new Hashtag("true", "Central to discussions of truth in epistemology and metaphysics."),
        new Hashtag("believe", "Important in epistemology, especially in discussions of knowledge and belief."),
        new Hashtag("social", "Central to discussions of social philosophy and political theory."),
        new Hashtag("individual", "Fundamental in discussions of personal identity, autonomy, and ethics."),
    ]

    constructor(tag: string, description: string) {
        this.tag = tag;
        this.description = description;
        this.id = uuidv4();
    }

    // Function to get a specific number of random elements from Hashtag.all
    static getRandomHashtags(count: number): Hashtag[] {
        if (count > Hashtag.all.length) {
            throw new Error(`Requested number exceeds available hashtags. Available: ${Hashtag.all.length}`);
        }

        // Shuffle the array
        const shuffled = [...Hashtag.all].sort(() => 0.5 - Math.random());
        // Return the specified number of random elements
        return shuffled.slice(0, count);
    }
}