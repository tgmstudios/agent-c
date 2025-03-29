export const getProjects = () => {
    const logoURL = require('../assets/logo.png');
    const projects = {
        'tagaby': {
            title: 'Tagaby RFID Tracking System',
            icon: logoURL,
            path: '/project/tagaby',
            excerpt: 'An RFID tracking tool for personal items like clothing and water bottles, powered by Node.js, MySQL, Flutter, and C# desktop applications.',
            content: `
### Tagaby RFID Tracking System
**Path:** /project/tagaby

Tagaby is an innovative RFID tracking system designed for managing personal items such as clothing, water bottles, and other frequently lost objects. By integrating RFID tags into everyday items, Tagaby offers a seamless solution for keeping track of belongings in real-time.

The system is powered by a robust backend developed using Node.js and MySQL, ensuring efficient data handling and real-time updates. The frontend is built using Flutter, delivering a cross-platform mobile experience that works on both Android and iOS devices. Additionally, a C# desktop application supports more advanced management capabilities for organizations requiring bulk item tracking.

Tagaby is ideal for schools, gyms, and large institutions, where misplaced items are a common issue. Its user-friendly interface and real-time notifications enhance the tracking experience, offering peace of mind for users.
            `.trim(),
            tags: ['rfid', 'tracking', 'nodejs', 'mysql', 'flutter', 'c#'],
            related: ['android-ota-update', 'xpressrfid-ecommerce', 'saints-verify']
        },
        'android-ota-update': {
            title: 'Android OTA Update Server',
            icon: logoURL,
            path: '/project/android-ota-update',
            excerpt: 'Secure over-the-air firmware update service for Android devices, enhancing client device management and reliability.',
            content: `
### Android OTA Update Server
**Path:** /project/android-ota-update

The Android OTA Update Server provides a reliable and secure solution for delivering over-the-air firmware updates to Android devices. Designed to enhance client device management, this server ensures that updates are deployed quickly and efficiently, minimizing downtime and improving user experience.

One of the key features of this project is its security-first approach. By validating device IMEIs before deploying updates, it ensures that only authorized devices receive the latest firmware. This reduces the risk of unauthorized installations and enhances system integrity.

This system is particularly beneficial for companies managing fleets of devices, ensuring consistency across all units and providing a streamlined update process that requires minimal user intervention.
            `.trim(),
            tags: ['android', 'ota', 'firmware', 'security'],
            related: ['tagaby', 'tgm-auth', 'tgmmc']
        },
        'perfect-portion': {
            title: 'Perfect Portion',
            icon: logoURL,
            path: '/project/perfect-portion',
            excerpt: 'AI-powered nutrition app that estimates serving sizes and nutritional info from meal photos. Winner of HackPSU Fall 2023.',
            content: `
### Perfect Portion
**Path:** /project/perfect-portion

Perfect Portion revolutionizes the way people approach healthy eating by utilizing AI to estimate serving sizes and nutritional information from meal photos. Users simply take a picture of their meal, and the app provides detailed nutritional breakdowns, including calories, macronutrients, and portion sizes.

This cutting-edge solution was recognized at HackPSU Fall 2023, where it won the top prize for its innovative use of AI in everyday life. The app leverages computer vision algorithms to analyze food items, making healthy eating more accessible and convenient for users.

Perfect Portion is perfect for health-conscious individuals, fitness enthusiasts, and anyone looking to monitor their dietary intake more effectively without the hassle of manual input.
            `.trim(),
            tags: ['ai', 'nutrition', 'computer vision', 'hackathon'],
            related: ['campus-calendar', 'squarebrain']
        },
        'campus-calendar': {
            title: 'Campus Calendar',
            icon: logoURL,
            path: '/project/campus-calendar',
            excerpt: 'Event platform with AI-driven personalized recommendations. Students can rate, save, and share events. HackPSU Spring 2024 2nd Place.',
            content: `
### Campus Calendar
**Path:** /project/campus-calendar

Campus Calendar is a dynamic event platform tailored to meet the needs of university students. By leveraging AI-driven personalized recommendations, it ensures students never miss out on events that match their interests, from club meetings to major campus festivals.

Users can interact with the platform by rating events, saving their favorites, and sharing them with friends. This interactive approach not only enhances student engagement but also fosters a stronger sense of community on campus.

Campus Calendar's innovative design earned it 2nd place at HackPSU Spring 2024. Its ability to provide tailored event suggestions and streamline event discovery makes it an indispensable tool for students seeking to balance academic and social life.
            `.trim(),
            tags: ['ai', 'events', 'campus', 'hackathon'],
            related: ['perfect-portion', 'squarebrain', 'saints-verify']
        },
        'telaeris-website': {
            title: 'Telaeris.com Website',
            icon: logoURL,
            path: '/project/telaeris-website',
            excerpt: 'Corporate website promoting products, offering customer support, and delivering software documentation, built using PHP and WordPress.',
            content: `
### Telaeris.com Website
**Path:** /project/telaeris-website

Telaeris.com is a comprehensive corporate website designed to showcase the company's range of products, services, and solutions. Built with PHP and WordPress, it offers a robust CMS platform that simplifies content management while maintaining a highly responsive design for optimal user engagement.

The site features a dedicated customer support section that streamlines issue resolution through FAQs, documentation, and direct support requests. Additionally, detailed product pages help clients explore various offerings with ease, enhancing the overall sales pipeline.

By delivering a seamless blend of informational content and interactive support, Telaeris.com helps position the company as a trusted partner in the RFID and access control industries, driving both customer retention and acquisition.
            `.trim(),
            tags: ['telaeris', 'wordpress', 'php', 'corporate'],
            related: ['xpressrfid-ecommerce', 'site-generator', 'squarebrain']
        },
        'xpressrfid-ecommerce': {
            title: 'XpressRFID.com E-commerce',
            icon: logoURL,
            path: '/project/xpressrfid-ecommerce',
            excerpt: 'An online store for RFID products, designed for system integrators and end-users. Implemented with inventory management and order fulfillment.',
            content: `
### XpressRFID.com E-commerce
**Path:** /project/xpressrfid-ecommerce

XpressRFID.com is an online marketplace dedicated to providing RFID products to system integrators and end-users. The platform simplifies the purchasing process by offering a wide array of RFID tags, readers, and accessories with intuitive navigation and detailed product descriptions.

The backend is designed to handle inventory management and order fulfillment, ensuring real-time stock updates and streamlined logistics. By integrating secure payment gateways and user-friendly interfaces, XpressRFID enhances customer trust and convenience.

This e-commerce platform serves as a valuable resource for organizations needing RFID solutions, bridging the gap between advanced technology providers and clients seeking customized tracking systems.
            `.trim(),
            tags: ['telaeris', 'ecommerce', 'rfid', 'inventory management'],
            related: ['telaeris-website', 'tagaby', 'site-generator']
        },
        'squarebrain': {
            title: 'SquareBrain Online Learning',
            icon: logoURL,
            path: '/project/squarebrain',
            excerpt: 'E-learning platform transforming traditional curriculums into engaging online lessons, built with PHP, MySQL, and WordPress.',
            content: `
### SquareBrain Online Learning
**Path:** /project/squarebrain

SquareBrain is an e-learning platform that transforms traditional curriculums into engaging and interactive online lessons. Developed with PHP, MySQL, and WordPress, it leverages modern web technologies to deliver a dynamic educational experience tailored to various learning styles.

The platform enables instructors to create interactive courses, quizzes, and multimedia content that engage students and promote better retention of information. With user management features, educators can track progress, issue certificates, and foster a collaborative online learning environment.

SquareBrain aims to democratize education by providing affordable and accessible online learning options, making it a valuable tool for educational institutions and independent learners alike.
            `.trim(),
            tags: ['e-learning', 'php', 'mysql', 'wordpress'],
            related: ['campus-calendar', 'perfect-portion', 'telaeris-website']
        },
        'saints-verify': {
            title: 'Saints Verify Discord Bot',
            icon: logoURL,
            path: '/project/saints-verify',
            excerpt: 'Discord bot that verifies users via email authentication to secure access to school and club servers, backed by MongoDB.',
            content: `
### Saints Verify Discord Bot
**Path:** /project/saints-verify

Saints Verify is a custom Discord bot designed to enhance server security through email-based user verification. By requiring users to authenticate their email addresses, it ensures that only authorized members gain access to school and club servers, minimizing the risk of unauthorized users.

Built with a MongoDB backend, the bot efficiently manages user data and verification statuses, offering a scalable solution for large communities. Its automated workflow reduces the need for manual verification, saving time for moderators while ensuring a secure environment.

This bot is particularly useful for educational institutions and community groups seeking to maintain a safe and exclusive online space for their members.
            `.trim(),
            tags: ['ccso', 'discord', 'bot', 'mongodb', 'verification'],
            related: ['campus-calendar', 'tgm-auth', 'tgmusic-bot']
        },
        'r2d2-replica': {
            title: 'R2-D2 Replica',
            icon: logoURL,
            path: '/project/r2d2-replica',
            excerpt: 'A personal C++ and Arduino project creating a functional Star Wars R2-D2 robot with Bluetooth control capabilities.',
            content: `
### R2-D2 Replica
**Path:** /project/r2d2-replica

The R2-D2 Replica project is a personal endeavor that brings the iconic Star Wars droid to life using C++ and Arduino. This fully functional robot features Bluetooth control capabilities, allowing users to maneuver it remotely via a mobile app.

The project integrates various electronic components, including servo motors, sensors, and custom-built circuits, to replicate R2-D2's distinctive movements and sounds. By merging robotics with fandom, the R2-D2 Replica demonstrates how technology can be used creatively for both education and entertainment.

This project is ideal for robotics enthusiasts and Star Wars fans alike, offering a unique hands-on learning experience in electronics, programming, and mechanical design.
            `.trim(),
            tags: ['robotics', 'arduino', 'c++', 'bluetooth'],
            related: ['tgm-mine', 'tgmusic-bot']
        },
        'red-bird-pantry': {
            title: 'Red Bird Pantry Website',
            icon: logoURL,
            path: '/project/red-bird-pantry',
            excerpt: 'Developed and maintained an online meal ordering platform, with search engine optimization and custom domain email hosting via Zoho.',
            content: `
### Red Bird Pantry Website
**Path:** /project/red-bird-pantry

The Red Bird Pantry Website provides a streamlined platform for online meal ordering, offering users a seamless experience from menu browsing to checkout. With a focus on community engagement, it caters to individuals in need, allowing them to access meal options conveniently.

Built with user experience in mind, the platform is optimized for search engines to increase its visibility and reach. Additionally, it integrates Zoho for custom domain email hosting, enhancing professional communication with clients and partners.

This project supports local initiatives by making food distribution more efficient and accessible, contributing to the community's overall well-being.
            `.trim(),
            tags: ['ccso', 'meal ordering', 'seo', 'zoho'],
            related: ['perfect-portion', 'telaeris-website', 'xpressrfid-ecommerce']
        },
        'tgm-auth': {
            title: 'TGM Auth API',
            icon: logoURL,
            path: '/project/tgm-auth',
            excerpt: 'Node.js/MySQL-based Single-Sign-On (SSO) API enabling user authentication with email verification, token management, and access control.',
            content: `
### TGM Auth API
**Path:** /project/tgm-auth

TGM Auth API is a powerful Single-Sign-On (SSO) solution built with Node.js and MySQL, providing seamless user authentication across multiple applications. The API supports email verification, token management, and granular access control, ensuring a secure and efficient login process.

This system reduces the complexity of managing multiple user credentials by centralizing authentication, improving both user experience and security. Its flexible architecture allows easy integration with various platforms, making it ideal for businesses with diverse digital ecosystems.

TGM Auth API enhances organizational security while offering users a streamlined, single-login experience across services.
            `.trim(),
            tags: ['tgm', 'nodejs', 'mysql', 'sso', 'authentication'],
            related: ['saints-verify', 'android-ota-update', 'tgmmc']
        },
        'tgm-mine': {
            title: 'TGMmine Mining Program',
            icon: logoURL,
            path: '/project/tgm-mine',
            excerpt: 'A lightweight and efficient mining program with features like pausing, remote start, push notifications, and OTA updates.',
            content: `
### TGMmine Mining Program
**Path:** /project/tgm-mine

TGMmine is a lightweight mining program designed for efficiency and ease of use. It features advanced functionalities such as pausing, remote start, push notifications, and over-the-air (OTA) updates, making it a versatile tool for mining enthusiasts.

With a focus on performance optimization, TGMmine minimizes resource consumption while maximizing output, ensuring stable operation even on lower-end hardware. Its remote management capabilities allow users to monitor and control mining operations from anywhere.

TGMmine is ideal for those seeking a reliable and flexible mining solution without compromising on performance or usability.
            `.trim(),
            tags: ['tgm', 'mining', 'ota', 'remote management'],
            related: ['android-ota-update', 'r2d2-replica', 'tgm-auth']
        },
        'tgmusic-bot': {
            title: 'TGMusic Discord Bot',
            icon: logoURL,
            path: '/project/tgmusic-bot',
            excerpt: 'A feature-rich music bot for Discord providing enhanced audio experiences and robust music playback capabilities.',
            content: `
### TGMusic Discord Bot
**Path:** /project/tgmusic-bot

TGMusic is a feature-rich Discord bot that elevates the server audio experience with high-quality music playback and a variety of customizable options. Users can play, queue, and control music seamlessly, turning their Discord servers into interactive social hubs.

The bot supports multiple sources and integrates advanced audio controls, including volume adjustment, crossfading, and playlist management. Its robust performance ensures minimal latency and smooth playback, enhancing the overall listening experience.

TGMusic is perfect for gaming communities, social groups, and any server looking to add a musical touch to their interactions.
            `.trim(),
            tags: ['tgm', 'discord', 'bot', 'music'],
            related: ['saints-verify', 'r2d2-replica', 'tgmmc']
        },
        'tgmmc': {
            title: 'TGMmc Minecraft Server',
            icon: logoURL,
            path: '/project/tgmmc',
            excerpt: 'A multi-version Minecraft server supporting Java and Bedrock editions, offering minigames, SMP, and more for a wide player base.',
            content: `
### TGMmc Minecraft Server
**Path:** /project/tgmmc  

TGMmc is a multi-version Minecraft server designed to support both Java and Bedrock editions, catering to a diverse player base. With features such as minigames, survival multiplayer (SMP), and custom plugins, it offers an engaging and inclusive experience for all players.  

The server’s cross-platform compatibility ensures that friends can play together regardless of their preferred edition, fostering a vibrant community. By regularly updating content and introducing new features, TGMmc keeps players engaged and entertained for hours.  

Whether you're into competitive minigames or collaborative building, TGMmc provides the perfect environment to explore, create, and compete.
            `.trim(),
            tags: ['tgm', 'discord', 'bot', 'music'],
            related: ['saints-verify', 'r2d2-replica', 'tgmmc']
        },
        'site-generator': {
            title: 'Site Generator',
            icon: logoURL,
            path: '/project/site-generator',
            excerpt: 'NodeJS-based tool synchronizing HTML, CSS, and JS files across websites, ensuring consistent headers, footers, and dynamic content.',
            content: `
### Site Generator
**Path:** /project/site-generator  

The Site Generator is a NodeJS-based tool developed to streamline website management by synchronizing HTML, CSS, and JavaScript files across multiple sites. Its primary objective is to ensure consistent headers, footers, and dynamic content across various web properties, reducing redundancy and maintenance efforts.  

By centralizing common assets, the Site Generator simplifies updates, allowing developers to implement changes globally without manually editing individual pages. This ensures uniform branding, navigation, and user experience across all connected sites.  

Additionally, the tool supports templating and dynamic content injection, making it easier to create and maintain complex websites with minimal effort. The Site Generator is an essential utility for organizations managing multiple web platforms, ensuring both consistency and efficiency in their web development workflow.
            `.trim(),
            tags: ['tgm', 'discord', 'bot', 'music'],
            related: ['saints-verify', 'r2d2-replica', 'tgmmc']
        }
    };

    return projects;
};
