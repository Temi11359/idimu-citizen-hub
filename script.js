// --- Image Fallback Handling ---
document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', () => {
        img.src = img.dataset.fallback;
    }, { once: true });
});

// --- Navigation Menu Functionality ---
const openNav = document.getElementById('openNav');
const closeNav = document.getElementById('closeNav');
const sideNav = document.getElementById('sideNav');
const navOverlay = document.getElementById('navOverlay');
const navItems = document.querySelectorAll('.nav-item');

function toggleMenu() {
    sideNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
}

function closeMenu() {
    sideNav.classList.remove('active');
    navOverlay.classList.remove('active');
}

openNav.addEventListener('click', toggleMenu);
closeNav.addEventListener('click', closeMenu);
navOverlay.addEventListener('click', closeMenu);

navItems.forEach(item => {
    item.addEventListener('click', closeMenu);
});

// --- Gallery Lightbox Functionality ---
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');

function openModal(src) {
    modalImg.src = src;
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => openModal(img.src));
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// --- Services Accordion Functionality ---
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const expanded = header.getAttribute('aria-expanded') === 'true';
        header.setAttribute('aria-expanded', String(!expanded));
        const panel = header.nextElementSibling;
        panel.classList.toggle('open');
    });
});

// --- Citizen Assistant (Chat) Functionality ---
const openChat = document.getElementById('openChat');
const closeChat = document.getElementById('closeChat');
const chatBox = document.getElementById('chatBox');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatMessages');

function openChatBox() {
    chatBox.classList.add('active');
}

function closeChatBox() {
    chatBox.classList.remove('active');
}

openChat.addEventListener('click', openChatBox);
closeChat.addEventListener('click', closeChatBox);
closeChat.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') closeChatBox();
});

function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msg;
}

// --- FAQ Answer Matching ---
// Every answer below only repeats what's already written elsewhere on this page.
// Checked in order, first keyword match wins.
const faqData = [
    // --- About ---
    {
        keywords: ['about', 'what is lcda', 'mission'],
        answer: "Isheri-Olofin LCDA is dedicated to bringing governance closer to the people, focusing on community development, infrastructure, education, public health, and socioeconomic empowerment for all residents."
    },

    // --- Departments (general + individual) ---
    {
        keywords: ['department'],
        answer: "The LCDA has 10 departments: Administration & Human Resources, Budget, Accounts & Finance, Works & Infrastructure, Legal, Tourism, ICT, Education, Women Affairs & Poverty Alleviation, and Agriculture."
    },
    {
        keywords: ['human resources', 'administration'],
        answer: "The Administration & Human Resources department is one of the LCDA's 10 departments. See the Departments section for the full list."
    },
    {
        keywords: ['budget'],
        answer: "The Budget department is one of the LCDA's 10 departments. See the Departments section for the full list."
    },
    {
        keywords: ['finance', 'accounts'],
        answer: "The Accounts & Finance department is one of the LCDA's 10 departments. See the Departments section for the full list."
    },
    {
        keywords: ['works', 'infrastructure'],
        answer: "The Works & Infrastructure department is one of the LCDA's 10 departments. See the Departments section for the full list."
    },
    {
        keywords: ['legal'],
        answer: "The Legal department is one of the LCDA's 10 departments. See the Departments section for the full list."
    },
    {
        keywords: ['tourism'],
        answer: "The Tourism department is one of the LCDA's 10 departments. See the Departments section for the full list."
    },
    {
        keywords: ['ict', 'technology'],
        answer: "The ICT department is one of the LCDA's 10 departments. See the Departments section for the full list."
    },
    {
        keywords: ['education', 'school'],
        answer: "The Education department is one of the LCDA's 10 departments. See the Departments section for the full list."
    },
    {
        keywords: ['women affairs', 'poverty'],
        answer: "The Women Affairs & Poverty Alleviation department is one of the LCDA's 10 departments. See the Departments section for the full list."
    },
    {
        keywords: ['agriculture', 'farming'],
        answer: "The Agriculture department is one of the LCDA's 10 departments. See the Departments section for the full list."
    },

    // --- Leadership ---
    {
        keywords: ['chairman'],
        answer: "The Executive Chairman leads Isheri-Olofin LCDA. See the Leadership section for a photo and details."
    },
    {
        keywords: ['vice chairman'],
        answer: "The Vice Chairman is part of the LCDA's executive leadership. See the Leadership section for details."
    },
    {
        keywords: ['secretary', 'slg'],
        answer: "The Secretary to the Local Government is part of the LCDA's executive leadership. See the Leadership section for details."
    },
    {
        keywords: ['supervisory councillor', 'councillor'],
        answer: "The Supervisory Councillor is part of the LCDA's community and leadership team. See the Leadership section for details."
    },
    {
        keywords: ['leader', 'leadership', 'executive'],
        answer: "The LCDA's leadership includes the Executive Chairman, Vice Chairman, Secretary to the Local Govt, and Supervisory Councillor. See the Leadership section for photos and details."
    },

    // --- Services ---
    {
        keywords: ['certificate of origin', 'origin certificate'],
        answer: "Certificate of Origin costs \u20a65,000. You'll need a valid ID, proof of residency, and 2 passport photos. Apply in person at the LCDA Secretariat."
    },
    {
        keywords: ['trade permit', 'business permit', 'trade & business'],
        answer: "Trade & Business Permit fees vary by business category. You'll need CAC registration (where applicable), proof of business address, and a valid ID. You can apply online or in person at the Trade & Commerce desk."
    },
    {
        keywords: ['marriage', 'wedding', 'marry'],
        answer: "Marriage Registration costs \u20a610,000. You'll need valid ID for both parties, 2 witnesses aged 21+, and 2 passport photos each. Book at least 21 days ahead at the council registry."
    },
    {
        keywords: ['health', 'clinic', 'hospital', 'medical'],
        answer: "Community Health Services are free or subsidized. No appointment needed for general consultation — just walk in to the nearest Primary Health Centre during clinic hours."
    },
    {
        keywords: ['service'],
        answer: "Available services are: Certificate of Origin, Trade & Business Permits, Marriage Registration, and Community Health Services. See the Services section for fees and requirements."
    },

    // --- Projects ---
    {
        keywords: ['road', 'rehabilitation'],
        answer: "The Road Rehabilitation Project (Completed) involved asphalt overlay and drainage construction to minimize flooding and ease traffic flow, at Central Isheri Road."
    },
    {
        keywords: ['primary health centre upgrade', 'health centre upgrade'],
        answer: "The Primary Health Centre Upgrade (Ongoing) involves expansion of medical wards and installation of modern diagnostic equipment, at Olofin Community Health Secretariat."
    },
    {
        keywords: ['project'],
        answer: "Current LCDA projects include the Road Rehabilitation Project (completed) and the Primary Health Centre Upgrade (ongoing). See the Projects section for details."
    },

    // --- Gallery ---
    {
        keywords: ['gallery', 'photo', 'picture'],
        answer: "You can view LCDA photos in the Photo Gallery section — click any image to see it enlarged."
    },

    // --- Announcements ---
    {
        keywords: ['empowerment', 'vocational', 'skill acquisition'],
        answer: "The Department of Women Affairs & Poverty Alleviation invites residents to register for the upcoming vocational skill acquisition session. See Announcements for the date."
    },
    {
        keywords: ['sanitation', 'drainage', 'environmental'],
        answer: "There's a notice that all commercial operations should ensure proper clearance of drainage systems ahead of inspections. See Announcements for the date."
    },
    {
        keywords: ['announcement', 'news'],
        answer: "Recent announcements include a Community Empowerment Program registration notice and an Environmental Sanitation Exercise notice. See the Announcements section for full details and dates."
    },

    // --- Contact ---
    {
        keywords: ['hour', 'open', 'time', 'when'],
        answer: "The LCDA Secretariat is open Monday to Friday, 8:00 AM to 4:00 PM."
    },
    {
        keywords: ['address', 'location', 'where'],
        answer: "The LCDA Secretariat is located at Isheri-Olofin LCDA Secretariat, Lagos State, Nigeria."
    },
    {
        keywords: ['phone', 'call', 'number'],
        answer: "You can reach the LCDA Secretariat at +234 (0) 123 456 7890."
    },
    {
        keywords: ['email'],
        answer: "You can email the LCDA at info@isheriolofincitizenhub.gov.ng."
    },
    {
        keywords: ['contact'],
        answer: "You can reach the LCDA Secretariat by phone at +234 (0) 123 456 7890, by email at info@isheriolofincitizenhub.gov.ng, or in person, Monday to Friday, 8:00 AM to 4:00 PM."
    },

    // --- Greetings ---
    {
        keywords: ['hi', 'hello', 'hey'],
        answer: "Hello! Ask me about services, fees, departments, leadership, projects, or how to contact the LCDA."
    },
    {
        keywords: ['thank'],
        answer: "You're welcome! Let me know if you have any other questions."
    }
];

function findAnswer(userText) {
    const lower = userText.toLowerCase();
    for (const entry of faqData) {
        if (entry.keywords.some(keyword => lower.includes(keyword))) {
            return entry.answer;
        }
    }
    return "I'm not sure about that one. Try asking about services, departments, leadership, projects, the gallery, announcements, or how to contact the LCDA.";
}

function sendMessage() {
    const text = userInput.value.trim();
    if (text === '') return;

    addMessage(text, 'user');
    userInput.value = '';

    setTimeout(() => {
        const reply = findAnswer(text);
        addMessage(reply, 'bot');
    }, 500);
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// --- Global Escape Key Handling ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (sideNav.classList.contains('active')) closeMenu();
        if (modal.classList.contains('active')) closeModal();
        if (chatBox.classList.contains('active')) closeChatBox();
    }
});
