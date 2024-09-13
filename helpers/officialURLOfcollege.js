const axios = require('axios');

// Replace with your Google Custom Search API key and search engine ID
const apiKey = 'YOUR_GOOGLE_API_KEY';
const cx = 'YOUR_SEARCH_ENGINE_ID';

const colleges = [
    'Indian Institute of Technology Bombay',
    'Delhi University',
    'Stanford University',
    'Massachusetts Institute of Technology'
];

const getCollegeHomepage = async (collegeName) => {
    const query = encodeURIComponent(collegeName + ' official site');
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;

    try {
        const response = await axios.get(url);
        const items = response.data.items;

        if (items && items.length > 0) {
            return items[0].link; // Return the first result's URL
        } else {
            return `No URL found for ${collegeName}`;
        }
    } catch (error) {
        console.error(`Error fetching data for ${collegeName}:`, error);
        return `Error fetching data for ${collegeName}`;
    }
};

const findCollegeHomepages = async () => {
    for (let college of colleges) {
        const homepage = await getCollegeHomepage(college);
        console.log(`${college}: ${homepage}`);
    }
};

findCollegeHomepages();
