const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Question = require("./models/Question");
const Course = require("./models/Course");

dotenv.config();

const questions = [
  {
    question: "What does MERN stand for?",
    options: [
      "MongoDB, Express, React, Node.js",
      "MySQL, Express, React, Node.js",
      "MongoDB, Express, Redux, Node.js",
      "MongoDB, Angular, React, Node.js",
    ],
    correctAnswer: 0,
    explanation: "MERN stands for MongoDB, Express.js, React.js and Node.js.",
    difficulty: "Easy",
  },
  {
    question: "Which database is used in the MERN stack?",
    options: [
      "MySQL",
      "MongoDB",
      "Oracle",
      "PostgreSQL",
    ],
    correctAnswer: 1,
    explanation: "MongoDB is the NoSQL database used in MERN.",
    difficulty: "Easy",
  },
  {
    question: "Which technology is used to build the user interface in MERN?",
    options: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
    ],
    correctAnswer: 2,
    explanation: "React.js is the frontend library used to build the UI.",
    difficulty: "Easy",
  },
  {
    question: "What is Node.js?",
    options: [
      "A database",
      "A JavaScript runtime",
      "A CSS framework",
      "A frontend library",
    ],
    correctAnswer: 1,
    explanation: "Node.js allows JavaScript to run outside the browser.",
    difficulty: "Easy",
  },
  {
    question: "What is Express.js?",
    options: [
      "A Node.js web framework",
      "A database",
      "A frontend library",
      "A programming language",
    ],
    correctAnswer: 0,
    explanation: "Express.js is a lightweight web framework for Node.js.",
    difficulty: "Easy",
  },
  {
    question: "Which command installs project dependencies?",
    options: [
      "npm install",
      "npm setup",
      "node install",
      "npm dependency",
    ],
    correctAnswer: 0,
    explanation: "npm install installs dependencies listed in package.json.",
    difficulty: "Easy",
  },
  {
    question: "What is JSX?",
    options: [
      "A database language",
      "A JavaScript syntax extension",
      "A CSS framework",
      "A server",
    ],
    correctAnswer: 1,
    explanation: "JSX allows HTML-like syntax to be written inside JavaScript.",
    difficulty: "Easy",
  },
  {
    question: "Which React hook is used to manage component state?",
    options: [
      "useEffect",
      "useState",
      "useParams",
      "useNavigate",
    ],
    correctAnswer: 1,
    explanation: "useState is used to create and manage state in functional components.",
    difficulty: "Easy",
  },
  {
    question: "Which React hook is commonly used for side effects?",
    options: [
      "useState",
      "useEffect",
      "useContext",
      "useReducer",
    ],
    correctAnswer: 1,
    explanation: "useEffect is commonly used for API calls and other side effects.",
    difficulty: "Easy",
  },
  {
    question: "Which method is commonly used to render arrays in React?",
    options: [
      "filter()",
      "map()",
      "reduce()",
      "find()",
    ],
    correctAnswer: 1,
    explanation: "map() is commonly used to create a list of React elements.",
    difficulty: "Easy",
  },
  {
    question: "What are props in React?",
    options: [
      "Database records",
      "Data passed between components",
      "CSS variables",
      "Server requests",
    ],
    correctAnswer: 1,
    explanation: "Props allow data to be passed from a parent component to a child.",
    difficulty: "Easy",
  },
  {
    question: "What is the Virtual DOM?",
    options: [
      "A database",
      "A lightweight representation of the DOM",
      "A server",
      "A browser extension",
    ],
    correctAnswer: 1,
    explanation: "React uses a Virtual DOM representation to efficiently update the UI.",
    difficulty: "Medium",
  },
  {
    question: "Which package is commonly used for routing in React?",
    options: [
      "react-router-dom",
      "express-router",
      "node-router",
      "react-navigation",
    ],
    correctAnswer: 0,
    explanation: "react-router-dom provides routing functionality for React web applications.",
    difficulty: "Easy",
  },
  {
    question: "Which HTTP method is generally used to retrieve data?",
    options: [
      "POST",
      "GET",
      "DELETE",
      "PUT",
    ],
    correctAnswer: 1,
    explanation: "GET requests are generally used to retrieve resources.",
    difficulty: "Easy",
  },
  {
    question: "Which HTTP method is generally used to create data?",
    options: [
      "GET",
      "POST",
      "DELETE",
      "HEAD",
    ],
    correctAnswer: 1,
    explanation: "POST is commonly used to create a new resource.",
    difficulty: "Easy",
  },
  {
    question: "Which HTTP method is commonly used to update data?",
    options: [
      "GET",
      "POST",
      "PUT",
      "OPTIONS",
    ],
    correctAnswer: 2,
    explanation: "PUT is commonly used to update or replace a resource.",
    difficulty: "Easy",
  },
  {
    question: "Which HTTP method is used to delete a resource?",
    options: [
      "GET",
      "POST",
      "DELETE",
      "PATCH",
    ],
    correctAnswer: 2,
    explanation: "DELETE is used to remove a resource.",
    difficulty: "Easy",
  },
  {
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Application Process Internet",
      "Advanced Programming Interface",
      "Application Program Input",
    ],
    correctAnswer: 0,
    explanation: "API stands for Application Programming Interface.",
    difficulty: "Easy",
  },
  {
    question: "What does CRUD stand for?",
    options: [
      "Create, Read, Update, Delete",
      "Create, Run, Update, Deploy",
      "Code, Read, Upload, Download",
      "Connect, Run, Update, Delete",
    ],
    correctAnswer: 0,
    explanation: "CRUD represents Create, Read, Update and Delete operations.",
    difficulty: "Easy",
  },
  {
    question: "What is Mongoose?",
    options: [
      "A React library",
      "An ODM for MongoDB",
      "A CSS framework",
      "A Node.js runtime",
    ],
    correctAnswer: 1,
    explanation: "Mongoose provides schema-based modeling for MongoDB in Node.js.",
    difficulty: "Medium",
  },
  {
    question: "MongoDB is which type of database?",
    options: [
      "Relational",
      "NoSQL document database",
      "Graph database",
      "File database",
    ],
    correctAnswer: 1,
    explanation: "MongoDB is a NoSQL document-oriented database.",
    difficulty: "Easy",
  },
  {
    question: "MongoDB stores records primarily as what?",
    options: [
      "Rows",
      "Documents",
      "Tables",
      "Sheets",
    ],
    correctAnswer: 1,
    explanation: "MongoDB stores data as BSON documents.",
    difficulty: "Easy",
  },
  {
    question: "What is a MongoDB collection similar to in a relational database?",
    options: [
      "Column",
      "Table",
      "Row",
      "Index",
    ],
    correctAnswer: 1,
    explanation: "A MongoDB collection is conceptually similar to a relational database table.",
    difficulty: "Medium",
  },
  {
    question: "What is a MongoDB document similar to in a relational database?",
    options: [
      "Row",
      "Table",
      "Database",
      "Column",
    ],
    correctAnswer: 0,
    explanation: "A MongoDB document is roughly equivalent to a row.",
    difficulty: "Medium",
  },
  {
    question: "What is JSON commonly used for in web applications?",
    options: [
      "Data exchange",
      "Image editing",
      "Video compression",
      "Operating systems",
    ],
    correctAnswer: 0,
    explanation: "JSON is commonly used to exchange structured data between client and server.",
    difficulty: "Easy",
  },
  {
    question: "What does JWT stand for?",
    options: [
      "Java Web Token",
      "JSON Web Token",
      "JavaScript Web Tool",
      "JSON Web Technology",
    ],
    correctAnswer: 1,
    explanation: "JWT stands for JSON Web Token.",
    difficulty: "Easy",
  },
  {
    question: "JWT is commonly used for what?",
    options: [
      "Authentication",
      "Image processing",
      "CSS styling",
      "Database indexing",
    ],
    correctAnswer: 0,
    explanation: "JWT is commonly used to securely transmit authentication claims.",
    difficulty: "Easy",
  },
  {
    question: "What is authentication?",
    options: [
      "Checking user identity",
      "Checking screen size",
      "Deleting data",
      "Styling a page",
    ],
    correctAnswer: 0,
    explanation: "Authentication verifies who the user is.",
    difficulty: "Easy",
  },
  {
    question: "What is authorization?",
    options: [
      "Verifying identity",
      "Determining what a user can access",
      "Encrypting images",
      "Creating a database",
    ],
    correctAnswer: 1,
    explanation: "Authorization determines which resources or actions a user is permitted to access.",
    difficulty: "Easy",
  },
  {
    question: "What is middleware in Express.js?",
    options: [
      "A database",
      "A function that runs during the request-response cycle",
      "A React component",
      "A CSS file",
    ],
    correctAnswer: 1,
    explanation: "Express middleware can process requests before they reach the final route handler.",
    difficulty: "Medium",
  },
  {
    question: "Which object contains information about the incoming request in Express?",
    options: [
      "req",
      "res",
      "app",
      "routerOnly",
    ],
    correctAnswer: 0,
    explanation: "The req object represents the incoming HTTP request.",
    difficulty: "Easy",
  },
  {
    question: "Which object is used to send a response in Express?",
    options: [
      "req",
      "res",
      "app",
      "sendOnly",
    ],
    correctAnswer: 1,
    explanation: "The res object is used to send the HTTP response.",
    difficulty: "Easy",
  },
  {
    question: "Which Express method defines a GET route?",
    options: [
      "app.get()",
      "app.fetch()",
      "app.read()",
      "app.request()",
    ],
    correctAnswer: 0,
    explanation: "app.get() defines a route that handles HTTP GET requests.",
    difficulty: "Easy",
  },
  {
    question: "What does CORS stand for?",
    options: [
      "Cross-Origin Resource Sharing",
      "Common Object Request Service",
      "Cross-Origin Routing System",
      "Client-Origin Response Security",
    ],
    correctAnswer: 0,
    explanation: "CORS stands for Cross-Origin Resource Sharing.",
    difficulty: "Medium",
  },
  {
    question: "Which status code normally indicates a successful request?",
    options: [
      "200",
      "404",
      "500",
      "401",
    ],
    correctAnswer: 0,
    explanation: "HTTP 200 indicates that the request was successful.",
    difficulty: "Easy",
  },
  {
    question: "Which status code means Not Found?",
    options: [
      "200",
      "201",
      "404",
      "500",
    ],
    correctAnswer: 2,
    explanation: "HTTP 404 means the requested resource could not be found.",
    difficulty: "Easy",
  },
  {
    question: "Which status code usually indicates an unauthorized request?",
    options: [
      "200",
      "401",
      "404",
      "500",
    ],
    correctAnswer: 1,
    explanation: "HTTP 401 indicates that authentication is required or has failed.",
    difficulty: "Medium",
  },
  {
    question: "Which status code usually indicates that the server encountered an error?",
    options: [
      "200",
      "201",
      "404",
      "500",
    ],
    correctAnswer: 3,
    explanation: "HTTP 500 represents an internal server error.",
    difficulty: "Easy",
  },
  {
    question: "What is Axios commonly used for?",
    options: [
      "Making HTTP requests",
      "Creating databases",
      "Styling components",
      "Compiling JavaScript",
    ],
    correctAnswer: 0,
    explanation: "Axios is a JavaScript library commonly used for HTTP requests.",
    difficulty: "Easy",
  },
  {
    question: "What is localStorage commonly used for in a frontend application?",
    options: [
      "Storing data in the browser",
      "Creating MongoDB collections",
      "Running Node.js",
      "Creating APIs",
    ],
    correctAnswer: 0,
    explanation: "localStorage allows key-value data to persist in the browser.",
    difficulty: "Easy",
  },
  {
    question: "What is an environment variable commonly used for?",
    options: [
      "Storing configuration values",
      "Creating JSX elements",
      "Styling buttons",
      "Rendering images",
    ],
    correctAnswer: 0,
    explanation: "Environment variables are commonly used for configuration such as database URLs and secrets.",
    difficulty: "Medium",
  },
  {
    question: "Why should sensitive secrets not be hard-coded in frontend code?",
    options: [
      "They can be exposed to users",
      "React cannot compile them",
      "CSS will break",
      "MongoDB will stop working",
    ],
    correctAnswer: 0,
    explanation: "Frontend code is accessible to users, so sensitive secrets can be exposed.",
    difficulty: "Medium",
  },
  {
    question: "What is a React component?",
    options: [
      "A reusable UI building block",
      "A database table",
      "An API endpoint",
      "A server process",
    ],
    correctAnswer: 0,
    explanation: "React components are reusable building blocks used to construct user interfaces.",
    difficulty: "Easy",
  },
  {
    question: "What is the purpose of the key prop when rendering lists in React?",
    options: [
      "Help React identify list elements",
      "Connect to MongoDB",
      "Create API routes",
      "Encrypt data",
    ],
    correctAnswer: 0,
    explanation: "Keys help React identify which list items have changed.",
    difficulty: "Medium",
  },
  {
    question: "What does useNavigate provide in React Router?",
    options: [
      "Programmatic navigation",
      "Database access",
      "State management",
      "CSS styling",
    ],
    correctAnswer: 0,
    explanation: "useNavigate allows navigation programmatically from a React component.",
    difficulty: "Medium",
  },
  {
    question: "What does useParams provide?",
    options: [
      "URL parameters",
      "Database records",
      "CSS classes",
      "HTTP headers only",
    ],
    correctAnswer: 0,
    explanation: "useParams provides dynamic parameters from the current URL.",
    difficulty: "Medium",
  },
  {
    question: "What is responsive web design?",
    options: [
      "A design that adapts to different screen sizes",
      "A design only for desktop",
      "A design without CSS",
      "A database design",
    ],
    correctAnswer: 0,
    explanation: "Responsive design allows websites to adapt to different devices and screen sizes.",
    difficulty: "Easy",
  },
  {
    question: "Which CSS feature is commonly used for responsive layouts?",
    options: [
      "Media queries",
      "Mongo queries",
      "API queries",
      "JWT queries",
    ],
    correctAnswer: 0,
    explanation: "CSS media queries allow styles to change based on screen conditions.",
    difficulty: "Easy",
  },
  {
    question: "What is Git mainly used for?",
    options: [
      "Version control",
      "Database management",
      "Image editing",
      "Web hosting only",
    ],
    correctAnswer: 0,
    explanation: "Git is a distributed version control system.",
    difficulty: "Easy",
  },
  {
    question: "What is GitHub commonly used for?",
    options: [
      "Hosting and collaborating on code",
      "Running MongoDB locally",
      "Creating CSS",
      "Editing videos",
    ],
    correctAnswer: 0,
    explanation: "GitHub provides repositories and collaboration features for software projects.",
    difficulty: "Easy",
  },
  {
    question: "What is the main purpose of an LMS?",
    options: [
      "Manage and deliver learning content",
      "Only create images",
      "Only manage databases",
      "Only send emails",
    ],
    correctAnswer: 0,
    explanation: "An LMS helps manage courses, learners, learning content and progress.",
    difficulty: "Easy",
  },
  {
    question: "Which architecture is represented by the MERN stack?",
    options: [
      "Full-stack JavaScript development",
      "Only database development",
      "Only frontend development",
      "Only mobile development",
    ],
    correctAnswer: 0,
    explanation: "MERN enables full-stack development using JavaScript technologies.",
    difficulty: "Medium",
  },
  {
    question: "Why is separating frontend and backend useful?",
    options: [
      "It separates UI and server responsibilities",
      "It removes the need for APIs",
      "It prevents databases",
      "It removes JavaScript",
    ],
    correctAnswer: 0,
    explanation: "Separation makes application responsibilities easier to organize and maintain.",
    difficulty: "Medium",
  },
];

const seedQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    const course = await Course.findOne({
      title: "MERN Stack Development",
    });

    if (!course) {
      console.log("MERN Stack Development course not found.");
      process.exit(1);
    }

    await Question.deleteMany({
      courseId: course._id,
    });

    const questionsWithCourse = questions.map((item) => ({
      ...item,
      courseId: course._id,
    }));

    await Question.insertMany(questionsWithCourse);

    console.log(
      `Successfully inserted ${questionsWithCourse.length} questions.`
    );

    console.log(`Course: ${course.title}`);

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedQuestions();