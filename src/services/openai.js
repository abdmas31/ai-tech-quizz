import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

const topics = {
    Frontend: [
        'React fundamentals',
        'JavaScript ES6+',
        'HTML5 & CSS3',
        'State management',
        'REST APIs & Fetch',
        'Responsive design',
        'Web performance',
        'Browser APIs',
        'TypeScript basics',
        'Frontend testing'
    ],
    Backend: [
        'Node.js & Express',
        'RESTful APIs',
        'Database design',
        'Authentication & Security',
        'Server deployment',
        'Microservices',
        'API documentation',
        'Error handling',
        'Caching strategies',
        'Backend testing'
    ],
    'System Design': [
        'Scalability',
        'Load balancing',
        'Caching systems',
        'Database sharding',
        'Microservices architecture',
        'API gateway design',
        'Message queues',
        'CDN architecture',
        'Monitoring & logging',
        'Security & authentication'
    ],
    DSA: [
        'arrays', 
        'linked lists', 
        'stacks & queues', 
        'trees & graphs', 
        'sorting algorithms',
        'searching algorithms',
        'dynamic programming',
        'hash tables',
        'big O notation',
        'recursion'
    ],
    DevOps: [
        'Docker & Containers',
        'Kubernetes',
        'CI/CD pipelines',
        'AWS services',
        'Infrastructure as Code',
        'Monitoring & Logging',
        'Shell scripting',
        'Terraform',
        'Jenkins',
        'Cloud architecture'
    ],
    Database: [
        'SQL fundamentals',
        'NoSQL concepts',
        'Database indexing',
        'ACID properties',
        'Database normalization',
        'Query optimization',
        'Transactions',
        'MongoDB',
        'PostgreSQL',
        'Redis'
    ],
    Security: [
        'OWASP top 10',
        'Authentication methods',
        'JWT & Sessions',
        'XSS prevention',
        'SQL injection',
        'CSRF protection',
        'Security headers',
        'Password hashing',
        'SSL/TLS',
        'Security best practices'
    ],
    Mobile: [
        'React Native',
        'iOS development',
        'Android development',
        'Mobile UI/UX',
        'App state management',
        'Native APIs',
        'App performance',
        'Mobile testing',
        'Push notifications',
        'App deployment'
    ],
    Testing: [
        'Unit testing',
        'Integration testing',
        'E2E testing',
        'Test-driven development',
        'Jest & React Testing Library',
        'Cypress',
        'Mocking',
        'Test coverage',
        'Performance testing',
        'API testing'
    ],
    Git: [
        'Basic Git commands',
        'Branching strategies',
        'Merge conflicts',
        'Git workflow',
        'Pull requests',
        'Git hooks',
        'GitHub actions',
        'Repository management',
        'Git best practices',
        'Collaboration with Git'
    ]
};

let previousQuestions = new Set();

export const generateQuestions = async (subject, level) => {
    try {
        console.log('Generating questions for:', { subject, level });

        // Get 5 random topics from the subject
        const subjectTopics = topics[subject] || [];
        const selectedTopics = [];
        const usedIndexes = new Set();

        // Select 5 unique random topics
        while (selectedTopics.length < 5 && usedIndexes.size < subjectTopics.length) {
            const randomIndex = Math.floor(Math.random() * subjectTopics.length);
            if (!usedIndexes.has(randomIndex)) {
                usedIndexes.add(randomIndex);
                selectedTopics.push(subjectTopics[randomIndex]);
            }
        }

        const prompt = `Generate 5 multiple choice questions about ${subject}, one question each about these specific topics: ${selectedTopics.join(', ')}. 
        Make the questions appropriate for level ${level} (1=Beginner, 2=Intermediate, 3=Advanced).
        Each question should be unique, challenging, and educational.
        Format the response as a JSON array with exactly this structure:
        [
            {
                "questionText": "Question text here",
                "answerOptions": [
                    {"answerText": "Correct answer", "isCorrect": true},
                    {"answerText": "Wrong answer 1", "isCorrect": false},
                    {"answerText": "Wrong answer 2", "isCorrect": false},
                    {"answerText": "Wrong answer 3", "isCorrect": false}
                ]
            }
        ]`;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an expert technical instructor who creates challenging and educational quiz questions. Adjust the difficulty based on the level provided. Always format the response as valid JSON that can be parsed."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.8,
            max_tokens: 2500
        });

        const content = response.choices[0].message.content;
        console.log('OpenAI Response:', content);

        try {
            const questions = JSON.parse(content);
            
            // Validate the response format
            if (!Array.isArray(questions) || questions.length !== 5) {
                throw new Error('Invalid response format: expected array of 5 questions');
            }

            questions.forEach((q, i) => {
                // Check for duplicate questions
                if (previousQuestions.has(q.questionText)) {
                    throw new Error(`Question ${i + 1} is a duplicate`);
                }
                previousQuestions.add(q.questionText);

                // Validate question format
                if (!q.questionText || !Array.isArray(q.answerOptions)) {
                    throw new Error(`Question ${i + 1} is missing required fields`);
                }
                if (q.answerOptions.length !== 4) {
                    throw new Error(`Question ${i + 1} does not have exactly 4 options`);
                }
                const correctAnswers = q.answerOptions.filter(a => a.isCorrect).length;
                if (correctAnswers !== 1) {
                    throw new Error(`Question ${i + 1} does not have exactly 1 correct answer`);
                }
            });

            // Keep set size manageable
            if (previousQuestions.size > 100) {
                previousQuestions.clear();
            }

            return questions;
        } catch (parseError) {
            console.error('Failed to parse or validate OpenAI response:', parseError);
            throw new Error('Failed to generate valid questions. Please try again.');
        }
    } catch (error) {
        console.error('OpenAI Error:', error);
        if (error.response) {
            console.error('OpenAI Error Response:', error.response.data);
        }
        throw new Error(error.message || 'Failed to generate questions. Please try again.');
    }
};