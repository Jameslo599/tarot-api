# Tarot API

This is a REST API that manages a fun tarot card reading activity.

**Link to project:** https://tarot-api.up.railway.app/

![portfolio website](/public/images/tarot-api.webp)

## How It's Made:

**Tech used:** HTML, CSS, TailwindCSS, JavaScript, Node.js, Express, MongoDB

For my inaugural REST API project, I embarked on the creation of a Tarot card reading application tailored to cater to users intrigued by the mystical world of Tarot. Beyond offering a gateway for Tarot enthusiasts, the application empowers users to delve into personal readings and archive them securely within their accounts. The crowning achievement of this endeavor is the seamless integration of the 'crypto' npm module, which serves as the backbone for a robust and personalized user authentication system.

Upon entering the website, users are greeted with an immersive journey into the history of the Tarot de Marseille. Two prominent calls-to-action beckon them towards the 'About' and 'Tarot Reading' pages. The 'About' page unfolds as a comprehensive guide, illuminating the art of interpreting Tarot card images and unraveling their profound meanings. Users can seamlessly navigate through various chapters in the table of contents, enhancing their understanding of Tarot symbolism.

The focal point of the application, the 'Tarot Reading' page, offers users the opportunity to engage in a fundamental three-card reading. By posing a question in the input field and submitting the form, a triumvirate of API calls orchestrates the retrieval of three randomly selected cards from the database. The dynamic results are promptly updated in the DOM, offering users a personalized and enlightening experience. For those logged in, a save function becomes available, allowing them to archive their readings securely within their accounts for future reflection.

The 'Tarot API' page stands as a valuable resource, enabling users to explore in-depth information about any of the 22 major arcana cards. A simple dropdown menu facilitates the selection of a card, triggering a singular API call to the server. The server, in turn, responds promptly with a wealth of information encapsulating the essence and significance of the chosen card.

Navigating to the 'Login' page, users encounter a gateway to their accounts, armed with the ability to sign in or recover forgotten passwords through a straightforward 'Forgot Password' option. Notably, a pragmatic approach is adopted, utilizing the 'confirm' method to validate emails and deliver password recovery alerts. The sign-up logic is thoughtfully designed to prevent the creation of duplicate accounts based on emails or usernames. Once logged in, users gain access to the 'History' page, where they can revisit past readings or opt to remove them from their archives.

In conclusion, this Tarot card reading application weaves together mysticism and technology, providing an inviting and educational space for users to explore the rich tapestry of Tarot symbolism. The meticulous integration of the 'crypto' npm module for user authentication elevates the application's security, while each page unfolds as a unique chapter in the user's journey through the captivating realm of Tarot.

## Optimizations

Refactoring the existing boilerplate code presents an opportunity to enhance both readability and the server's call and response speed, ultimately delivering a more seamless user experience.

Addressing readability concerns involves streamlining and organizing the code for clarity. This could include employing more descriptive variable and function names, breaking down complex sections into smaller, focused functions, and adhering to consistent coding conventions.

To optimize server call and response speed, several strategies can be implemented. Caching mechanisms can be introduced to store frequently requested data temporarily, reducing the need for redundant server calls. Additionally, asynchronous operations and non-blocking code practices can be leveraged to ensure the server remains responsive during resource-intensive tasks.

Consideration should also be given to employing techniques such as code splitting, lazy loading, and minimizing unnecessary data transfers to the client. This not only accelerates the initial loading time but also contributes to an overall smoother interaction with the application.

In summary, a meticulous refactoring effort can significantly elevate the codebase by improving both readability and the efficiency of server interactions. This not only enhances the developer's understanding of the code but also contributes to a faster and more responsive user experience.

## Lessons Learned:

I have significantly expanded my expertise in constructing full-stack applications, particularly in utilizing Express for the backend and MongoDB for database management. This experience has markedly increased my confidence and proficiency in handling backend technologies. I am now at a stage where I feel comfortable navigating the intricacies of backend development.

The hands-on experience gained from building full-stack applications has not only deepened my understanding of Express and MongoDB but has also provided insights into the seamless integration of front-end and back-end components. This newfound comfort serves as a solid foundation, and I eagerly anticipate the opportunity to tackle even more intricate and sophisticated projects in the future.

As I continue to explore the ever-evolving landscape of web development, my goal is to leverage this enhanced skill set to contribute to the creation of complex and robust applications. The journey so far has been both enlightening and rewarding, and I am excited about the prospect of pushing my boundaries further in the realm of full-stack development.
