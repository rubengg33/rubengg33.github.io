
class RelativeTime extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
        setInterval(() => this.render(), 1000);

    }
    render() {
        const timeValue = this.getAttribute('time')
        const time = timeValue ? new Date(timeValue).getTime() : Date.now();
        const now = Date.now();

        const diff = now - time;
        const seconds = Math.floor(diff / 1000) || 1;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        let aux = '...';
        if (months >= 12) {
            aux = `Hace ${years} año${years > 1 ? 's' : ''}`
        } else if (days > 30 && months >= 1) {
            aux = `Hace ${months} mes${months > 1 ? 'es' : ''}`
        } else if (days >= 1) {
            aux = `Hace ${days} día${days > 1 ? 's' : ''}`
        } else if (hours >= 1) {
            aux = `Hace ${hours} hora${hours > 1 ? 's' : ''}`
        } else if (minutes >= 1) {
            aux = `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`
        } else if (seconds >= 1) {
            aux = `Hace ${seconds} segundo${seconds > 1 ? 's' : ''}`
        }

        this.textContent = aux;
    }
}
customElements.define('relative-time', RelativeTime);
const articles = [
    {
      "id": 1,
      "image": "https://cdn.kqed.org/wp-content/uploads/sites/35/2024/10/GettyImages-1347890261-1020x680.jpg",
      "title": "Climate Activists Push for Carbon Tax With Measure GG, But Critics Warn it Could Backfire",
      "description": "Grassroots climate activists argue a tax on gas use in large buildings will help all of Berkeley kick fossil fuels. But many politicians, businesses, and nonprofits, even those that work on climate, don’t think Measure GG is the policy to get there.",
      "date": "2023-10-17T11:00:16Z",
      "category": "Climate"
    },
    {
      "id": 2,
      "image": "https://fortune.com/img-assets/wp-content/uploads/2024/10/GettyImages-2170862982_413c33-e1729160290535.jpg?resize=1200,600",
      "title": "Musk’s empire risks being targeted by EU for potential X fines",
      "description": "The EU may target Elon Musk’s broader business empire for X fines, potentially including revenue from SpaceX and Neuralink to increase penalties.",
      "date": "2024-09-17T10:32:45Z",
      "category": "Business"
    },
    {
      "id": 3,
      "image": "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729160267/autoexpress/2024/10/Omode E5 first UK drive.jpg",
      "title": "Omoda E5 in Noble trim - pictures",
      "description": "Pictures of the electric Omode E5 SUV being driven on UK roads. Pictures taken by Auto Express senior photographer Pete Gibson",
      "date": "2024-10-15T10:30:56Z",
      "category": "Automobile"
    },
    {
      "id": 4,
      "image": "https://cdn.mos.cms.futurecdn.net/6xqynicLzH6sSskfiNyWoT-1200-80.jpg",
      "title": "Renault, Alpine and Citroën help the 2024 Paris Motor Show return to form",
      "description": "Explore the most delectable debuts at the Paris Motor Show 2024 – or Mondial de l'Auto – including designs from France's big car makers and niche machines from around the world",
      "date": "2024-10-13T10:25:24Z",
      "category": "Automobile"
    },
    {
      "id": 5,
      "image": "https://www.computerworld.com/wp-content/uploads/2024/10/3567767-0-90640600-1729160617-IDG-Germany-Intel-September-News.jpg?quality=50&strip=all&w=1024",
      "title": "Chinese cybersecurity association urges review of Intel products",
      "description": "The Cybersecurity Association of China (CSAC) has urged a security review of Intel products sold in the country, claiming the US semiconductor firm poses ongoing threats to China’s national security and interests.",
      "date": "2024-10-01T10:22:56Z",
      "category": "Technology"
    },
    {
      "id": 6,
      "image": "https://ichef.bbci.co.uk/images/ic/1920x1080/p0jxm0pn.jpg.webp",
      "title": "New Study Reveals the Benefits of Mindfulness for Mental Health",
      "description": "Recent research highlights the positive impact of mindfulness practices on mental well-being, suggesting that even short daily sessions can significantly reduce stress and anxiety levels.",
      "date": "2024-10-28T09:00:00Z",
      "category": "Health"
    },
    {
      "id": 7,
      "image": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/469b/live/f2b212f0-963e-11ef-9260-19e6a950e830.jpg.webp",
      "title": "World Leaders Gather for Climate Summit in Glasgow",
      "description": "Global leaders convene in Glasgow for a critical climate summit, aiming to strengthen commitments to reduce carbon emissions and combat climate change.",
      "date": "2024-10-29T08:00:00Z",
      "category": "News"
    },
    {
      "id": 8,
      "image": "https://ichef.bbci.co.uk/news/640/cpsprodpb/c6a3/live/d1f38410-95d3-11ef-9eb7-7b7defb4f9e7.jpg.webp",
      "title": "UK Inflation Rate Hits 40-Year High",
      "description": "The UK faces economic challenges as inflation rates reach their highest level in four decades, raising concerns about the cost of living for families.",
      "date": "2024-10-28T10:15:00Z",
      "category": "News"
    },
    {
      "id": 9,
      "image": "https://ichef.bbci.co.uk/news/480/cpsprodpb/d561/live/e27abbc0-9455-11ef-89ae-5575c76d98e6.png.webp",
      "title": "US Elections: Early Voting Surges Ahead of Midterms",
      "description": "Early voting has surged across the United States as citizens prepare for the upcoming midterm elections, with high turnout expected in key battleground states.",
      "date": "2024-10-27T12:00:00Z",
      "category": "News"
    },
    {
      "id": 10,
      "image": "https://ichef.bbci.co.uk/news/1536/cpsprodpb/10cf/live/8ced1530-8a4c-11ef-b6b0-c9af5f7f16e4.jpg.webp",
      "title": "NASA Launches Mission to Explore Asteroid Belt",
      "description": "NASA has successfully launched a new spacecraft on a mission to explore the asteroid belt, aiming to gather data that could reveal insights into the solar system's formation.",
      "date": "2024-10-26T15:45:00Z",
      "category": "News"
    },
    {
      "id": 11,
      "image": "https://ichef.bbci.co.uk/news/640/cpsprodpb/27d6/live/c1fc7dc0-95f9-11ef-8e2e-e71633ffe5ec.jpg.webp",
      "title": "Global Markets Slide as US Fed Signals Rate Hikes",
      "description": "Global financial markets are in turmoil as the US Federal Reserve hints at more aggressive interest rate hikes to combat rising inflation.",
      "date": "2024-10-25T09:30:00Z",
      "category": "News"
    },
    {
      "id": 12,
      "image": "https://ichef.bbci.co.uk/news/640/cpsprodpb/4ce2/live/e4272a10-9222-11ef-89ae-5575c76d98e6.jpg.webp",
      "title": "New Study Links Screen Time to Sleep Issues in Teens",
      "description": "A recent study reveals a strong correlation between increased screen time and sleep problems among teenagers, prompting calls for better digital habits.",
      "date": "2024-10-24T11:00:00Z",
      "category": "News"
    },
    {
      "id": 13,
      "image": "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/1630/live/e838dd70-9622-11ef-90df-3f1823a91773.jpg.webp",
      "title": "Key Senate Races to Watch in the 2024 US Election",
      "description": "As the 2024 election approaches, several key Senate races could shift the balance of power in Congress.",
      "date": "2024-10-29T08:00:00Z", // Hoy
      "category": "US Election"
    },
    {
      "id": 14,
      "image": "https://ichef.bbci.co.uk/news/640/cpsprodpb/e0a5/live/07af42b0-95cf-11ef-ba4d-5b04a90bcb33.jpg.webp",
      "title": "Presidential Candidates Ramp Up Campaign Efforts",
      "description": "Presidential candidates are intensifying their campaign efforts as the election date draws near, focusing on swing states.",
      "date": "2024-10-25T14:30:00Z", // Hace 4 días
      "category": "US Election"
    },
    {
      "id": 15,
      "image": "https://ichef.bbci.co.uk/news/480/cpsprodpb/bdfc/live/b3ea0cc0-93ec-11ef-8e6d-e3e64e16c628.png.webp",
      "title": "Voter Turnout Expected to Be Higher Than Ever",
      "description": "Experts predict record-high voter turnout for the 2024 elections, driven by increased early voting and public engagement.",
      "date": "2024-10-24T12:00:00Z", // Hace 5 días
      "category": "US Election"
    },
    {
      "id": 16,
      "image": "https://ichef.bbci.co.uk/news/480/cpsprodpb/516e/live/8d267e50-8c05-11ef-8aba-b582a2b44a46.jpg.webp",
      "title": "How Social Media Influences the US Election Campaign",
      "description": "A look at the impact of social media on the 2024 election campaign, including how candidates use platforms to engage voters.",
      "date": "2024-10-20T16:00:00Z", // Hace 9 días
      "category": "US Election"
    },
    {
      "id": 17,
      "image": "https://ichef.bbci.co.uk/news/480/cpsprodpb/8267/live/4d5fea00-8b0a-11ef-b6b0-c9af5f7f16e4.jpg.webp",
      "title": "The Role of Independent Voters in the 2024 Election",
      "description": "Independent voters may play a crucial role in deciding the outcome of the 2024 elections as candidates vie for their support.",
      "date": "2024-10-23T10:00:00Z", // Hace 6 días
      "category": "US Election"
    },
    {
      "id": 18,
      "image": "https://ichef.bbci.co.uk/news/480/cpsprodpb/1d8b/live/a239a780-8ffd-11ef-bdde-a9ecbeabda78.jpg.webp",
      "title": "Polling Shows Tight Race Ahead of 2024 Election",
      "description": "Recent polling indicates a tightly contested race for the presidency, with candidates neck and neck as election day approaches.",
      "date": "2024-10-19T09:30:00Z", // Hace 10 días
      "category": "US Election"
    },
    {
      "id": 19,
      "image": "https://ichef.bbci.co.uk/ace/standard/240/cpsprodpb/e477/live/f4a0c530-95de-11ef-9260-19e6a950e830.jpg.webp",
      "title": "NFL Week 8 Preview: Key Matchups to Watch",
      "description": "As the NFL season heats up, Week 8 features some critical matchups that could shape playoff standings.",
      "date": "2024-10-29T10:00:00Z", // Hoy
      "category": "Sport"
    },
    {
      "id": 20,
      "image": "https://ichef.bbci.co.uk/news/416/cpsprodpb/4d81/live/e62ff790-8f9f-11ef-b3c2-754b6219680e.png",
      "title": "NBA Season Tips Off: Teams to Watch This Year",
      "description": "The NBA season is back, and fans are excited to see which teams will rise to the occasion and contend for the championship.",
      "date": "2024-10-26T14:30:00Z", // Hace 3 días
      "category": "Sport"
    },
    {
      "id": 21,
      "image": "https://ichef.bbci.co.uk/ace/standard/480/cpsprodpb/44b7/live/7febe7d0-960e-11ef-83ca-a3329ade90f4.jpg",
      "title": "Premier League Update: Top Teams Face Tough Challenges",
      "description": "The Premier League continues to deliver surprises as top teams face tough challenges in the latest round of fixtures.",
      "date": "2024-10-28T09:00:00Z", // Ayer
      "category": "Sport"
    },
    {
      "id": 22,
      "image": "https://ichef.bbci.co.uk/news/416/cpsprodpb/6964/live/146eba80-9110-11ef-a742-17f0640e0e62.jpg",
      "title": "World Series 2024: A Preview of the Championship",
      "description": "As the World Series approaches, fans eagerly anticipate the championship showdown between the top MLB teams.",
      "date": "2024-10-25T12:00:00Z", // Hace 4 días
      "category": "Sport"
    },
    {
      "id": 23,
      "image": "https://ichef.bbci.co.uk/news/416/cpsprodpb/1f1b/live/e9bbd610-8d31-11ef-bee0-39b1bce7fdf1.jpg",
      "title": "Top 5 NBA Teams to Watch This Season",
      "description": "Analyzing the top five NBA teams poised to make a deep playoff run this season, highlighting key players and strategies.",
      "date": "2024-10-20T11:30:00Z", // Hace 9 días
      "category": "Sport"
    },
    {
      "id": 24,
      "image": "https://ichef.bbci.co.uk/news/416/cpsprodpb/b856/live/2ef7a4a0-940a-11ef-918b-f53bd5fe392e.jpg",
      "title": "UFC 300: What to Expect from the Upcoming Fights",
      "description": "UFC 300 is set to deliver thrilling matchups, with fighters looking to make a statement in the octagon.",
      "date": "2024-10-23T14:00:00Z", // Hace 6 días
      "category": "Sport"
    },
    {
      "id": 25,
      "image": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/c41c/live/4c6b77d0-9592-11ef-8f04-87373314615d.jpg.webp",
      "title": "Global Economic Trends to Watch in 2024",
      "description": "As we approach 2024, experts predict key economic trends that could shape the global business landscape.",
      "date": "2024-10-29T08:00:00Z", // Hoy
      "category": "Business"
    },
    {
      "id": 26,
      "image": "https://ichef.bbci.co.uk/news/640/cpsprodpb/f0a0/live/28869f40-95c2-11ef-9035-b130616828c2.jpg.webp",
      "title": "Tech Stocks Rally: What Investors Need to Know",
      "description": "Tech stocks have seen a significant rally, prompting investors to reassess their portfolios as earnings reports come in.",
      "date": "2024-10-27T14:30:00Z", // Hace 2 días
      "category": "Business"
    },
    {
      "id": 27,
      "image": "https://ichef.bbci.co.uk/news/640/cpsprodpb/f9f8/live/94af0710-95e6-11ef-9607-9df2d810c28b.jpg.webp",
      "title": "Small Businesses Struggle Amid Rising Costs",
      "description": "Small businesses are facing challenges due to rising operational costs and inflation, impacting their profitability.",
      "date": "2024-10-25T12:15:00Z", // Hace 4 días
      "category": "Business"
    },
    {
      "id": 28,
      "image": "https://ichef.bbci.co.uk/news/1536/cpsprodpb/0445/live/bbc403a0-9055-11ef-b11a-eda09aca0cf9.jpg.webp",
      "title": "US Stocks: Market Outlook for the Final Quarter",
      "description": "Analysts provide insights into the stock market outlook as we head into the final quarter of 2024, focusing on key sectors.",
      "date": "2024-10-24T10:00:00Z", // Hace 5 días
      "category": "Business"
    },
    {
      "id": 29,
      "image": "https://ichef.bbci.co.uk/news/480/cpsprodpb/cd0b/live/0c2f0ca0-955a-11ef-ba4d-5b04a90bcb33.jpg.webp",
      "title": "Top Business Trends to Follow in 2024",
      "description": "An overview of the top business trends expected to impact industries in 2024, including sustainability and digital transformation.",
      "date": "2024-10-22T11:30:00Z", // Hace 6 días
      "category": "Business"
    },
    {
      "id": 30,
      "image": "https://ichef.bbci.co.uk/news/480/cpsprodpb/abce/live/cf4008d0-954f-11ef-8b5c-f156af5ee6bf.jpg.webp",
      "title": "US Economy: Forecast for the Coming Year",
      "description": "A comprehensive forecast of the US economy for 2024, examining key indicators and potential challenges.",
      "date": "2024-10-19T09:45:00Z", // Hace 10 días
      "category": "Business"
    }
  ]

class CustomSearch extends HTMLElement {
    constructor() {
        super();
        this.articles = articles;
    }

    connectedCallback() {
        const dialogBtn = this.querySelector('.dialog-search');
        const closeBtn = this.querySelector('.close-btn');
        const dialog = this.querySelector('dialog');

        dialogBtn.addEventListener('click', () => {
            dialog.showModal();
        });
        closeBtn.addEventListener('click', () => {
            dialog.close();
        });
        const siteSearch = this.querySelector('#site-search');
        siteSearch.addEventListener('input', (event) => this.search(event));

        this.renderResults('')
    }

    search(event) {
        event.preventDefault();
        const siteSearch = this.querySelector('#site-search');
        const term = siteSearch.value
        // console.log({term});
        this.renderResults(term)
    }

    renderResults(term = '') {
        // Implement your search logic here
        const searchResults = this.querySelector('#search-results');
        searchResults.innerHTML = '';
        const _articles = this.articles
            .filter(article => article.title.toLowerCase().includes(term.toLowerCase()))

        // mode 3 using <template>
        const template = this.querySelector('template').content;
        // loop
        _articles.map(article => {
            const li = template.querySelector('li').cloneNode(true);
            // item-image, item-title, item-description
            li.querySelector('.card .item-image').src = article.image;
            li.querySelector('.card .item-description').textContent = article.description;
            // replate relative-time time
            li.querySelector('relative-time').setAttribute('time', article.date)
            li.querySelector('.card .item-title a').textContent = article.title;

            const enlace = li.querySelector('.card .item-title a')
            const href = enlace.href
            enlace.href = href.replace('{id}', article.id)

            searchResults.appendChild(li);
        })
    }
}
customElements.define('custom-search', CustomSearch);




const getId = () => {
    const searchParams = new URLSearchParams(location.search.slice(1));
    return Number(searchParams.get('id'));
}

class CustomArticle extends HTMLElement {
    constructor() {
        super();
        this.articleId = getId();
    }
    connectedCallback() {
        this.render();
    }

    render() {
        const article = articles.find(article => article.id === this.articleId)
        if (article) {
            // reemplazos de los contenidos del article
            const h1 = this.querySelector('h1');
            h1.textContent = article.title;
            const p = this.querySelector('p');
            p.textContent = article.description;
            const img = this.querySelector('.article-img');
            img.src = article.image;
            const relativetime = this.querySelector('relative-time');
            // relativetime.setAttribute('time', article.date);
            const newrelativeTime = `<relative-time time="${article.date}"/>`;
            relativetime.outerHTML = newrelativeTime;
        }
    }
}
customElements.define('custom-article', CustomArticle);


const menuItems = document.querySelectorAll('.hijos');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remueve la clase 'active' de todos los elementos
        menuItems.forEach(i => i.classList.remove('active'));

        // Añade la clase 'active' al elemento clicado
        item.classList.add('active');
    });
});
const navbar = document.querySelector('.navbar');
const abrirMenu = document.querySelector('.menu-toggle');
const cerrarMenu = document.querySelector('.menu-close');
const body = document.body
const menuContainer = document.querySelector('.menu-container');
abrirMenu.addEventListener('click', () => {
    navbar.classList.add('visible');
    body.classList.add("fixed");
    menuContainer.classList.toggle('visible');
})
cerrarMenu.addEventListener('click', () => {
    navbar.classList.remove('visible');
    body.classList.remove("fixed");
    menuContainer.classList.toggle('visible');
    // .menu-toggle{
    //     display: none;
    //   }
})