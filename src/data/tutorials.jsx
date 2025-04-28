export const tutorials = {
  list: [
    {
      _id: "1",
      name: "React for Beginners",
      outside_img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8wh_vrysQFY_0CkcD-e-lYPPHLvsTaXqIGA&s",
      description:
        "A comprehensive guide to building web applications using React.",
      course_number: 12,
      price: 49.99,
      views: 1023,
      selectedLessonId: null,
      learn: [
        "JSX and component-based architecture",
        "State management with hooks",
        "Routing with React Router",
        "Handling forms and events",
        "Making API requests with Fetch/Axios",
      ],
      skills: ["React", "JavaScript", "HTML", "CSS", "API Integration"],
      chapters: [
        {
          name: "Introduction to React",
          description: "Learn the basics of React, JSX, and components.",
          lessons: [
            {
              title: "What is React?",
              id: "r101",
              duration: 10,
              learnedDuration: 10,
              name: "Introduction to React",
              rightType: "md",
              downloads: [
                {
                  file_name: "Sample Project Code",
                  file_link:
                    "https://github.com/facebook/react/archive/refs/heads/main.zip",
                },
              ],
              learn: [
                "Understand what React is and why it's used",
                "Learn about the virtual DOM and its benefits",
                "Explore how React efficiently updates the UI",
              ],
              skills: [
                "JavaScript",
                "React Basics",
                "Component-based Development",
              ],
            },
            {
              title: "JSX and Rendering",
              id: "r102",
              duration: 15,
              learnedDuration: 0,
              name: "Introduction to React",
              rightType: "code",
              left: "# What is React?\n\nDownload it HERE!!!",
              right:
                "<html><body><pre><code>function Welcome(props) {\n  return &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;\n}\n\nconst element = &lt;Welcome name=\"Alex\" /&gt;;\nReactDOM.render(element, document.getElementById('root'));</code></pre></body></html>",
              downloads: [
                {
                  file_name: "Sample Project Code",
                  file_link:
                    "https://github.com/facebook/react/archive/refs/heads/main.zip",
                },
              ],
              learn: [
                "Learn JSX syntax and how it differs from HTML",
                "Understand how rendering works in React",
                "Explore embedding JavaScript expressions in JSX",
              ],
              skills: ["JSX", "React Rendering", "JavaScript Expressions"],
            },
          ],
        },
        {
          name: "State Management in React",
          description: "Learn how to manage state in React using hooks.",
          lessons: [
            {
              title: "Using useState",
              id: "r201",
              duration: 20,
              learnedDuration: 0,
              name: "State Management with useState",
              rightType: "code",
              left: "# Introduction to useState\n\nLearn the basics of state in React.",
              right:
                "<html><body><pre><code>import React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>Click me</button>\n    </div>\n  );\n}</code></pre></body></html>",
              downloads: [
                {
                  file_name: "State Management Example",
                  file_link:
                    "https://github.com/facebook/react/archive/refs/heads/main.zip",
                },
              ],
              learn: [
                "Learn the basics of the useState hook",
                "Handle user interactions using state",
                "Update component UI dynamically with state changes",
              ],
              skills: ["React", "useState", "State Management"],
            },
            {
              title: "State and Props",
              id: "r202",
              duration: 18,
              learnedDuration: 0,
              name: "Understanding State and Props",
              rightType: "md",
              left: "# State vs Props\n\nExplore the difference between state and props.",
              right:
                "State is a local variable used inside a component to track changes in the UI. Props are values passed from parent components to child components to customize their behavior.",
              downloads: [
                {
                  file_name: "State and Props Example",
                  file_link:
                    "https://github.com/facebook/react/archive/refs/heads/main.zip",
                },
              ],
              learn: [
                "Understand the concept of props and how to pass them to child components",
                "Differentiate between state and props in React",
                "Use props to customize components",
              ],
              skills: ["React", "State Management", "Props"],
            },
          ],
        },
        {
          name: "React Router",
          description: "Learn how to implement routing in React applications.",
          lessons: [
            {
              title: "Setting up React Router",
              id: "r301",
              duration: 15,
              learnedDuration: 0,
              name: "React Router Setup",
              rightType: "code",
              left: "# React Router Basics\n\nLearn how to add navigation to your app.",
              right:
                "<html><body><pre><code>import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';\n\nfunction App() {\n  return (\n    <Router>\n      <Switch>\n        <Route path='/home' component={Home} />\n        <Route path='/about' component={About} />\n      </Switch>\n    </Router>\n  );\n}</code></pre></body></html>",
              downloads: [
                {
                  file_name: "React Router Example",
                  file_link:
                    "https://github.com/facebook/react/archive/refs/heads/main.zip",
                },
              ],
              learn: [
                "Learn how to set up React Router in your app",
                "Understand the concept of routes and how to navigate between them",
                "Use the Switch component to control which route is active",
              ],
              skills: ["React Router", "Routing", "React"],
            },
            {
              title: "Dynamic Routing",
              id: "r302",
              duration: 20,
              learnedDuration: 0,
              name: "Dynamic Routing in React",
              rightType: "md",
              left: "# Dynamic Routes\n\nLearn how to create routes that handle dynamic data.",
              right:
                "Dynamic routes allow you to create routes that can accept variables from the URL. For example, you can use dynamic routes for user profiles or blog posts.",
              downloads: [
                {
                  file_name: "Dynamic Routing Example",
                  file_link:
                    "https://github.com/facebook/react/archive/refs/heads/main.zip",
                },
              ],
              learn: [
                "Understand dynamic routing and how to pass parameters in the URL",
                "Learn to fetch and display data based on dynamic routes",
                "Integrate dynamic routes with state and props",
              ],
              skills: ["React Router", "Dynamic Routing", "React"],
            },
          ],
        },
      ],
    },
    // {
    //   _id: "2",
    //   name: "Vue.js for Beginners",
    //   outside_img: "https://vuejs.org/images/logo.png",
    //   description: "A comprehensive guide to building web applications using Vue.js.",
    //   course_number: 15,
    //   price: 39.99,
    //   views: 874,
    //   selectedLessonId: null,
    //   learn: [
    //     "Vue.js fundamentals and component-based architecture",
    //     "State management with Vue's reactivity system",
    //     "Routing with Vue Router",
    //     "Handling forms and events",
    //     "Making API requests with Fetch/Axios"
    //   ],
    //   skills: ["Vue.js", "JavaScript", "HTML", "CSS", "API Integration"],
    //   chapters: [
    //     {
    //       name: "Introduction to Vue.js",
    //       description: "Learn the basics of Vue.js, directives, and components.",
    //       lessons: [
    //         {
    //           "title": "What is Vue.js?",
    //           "id": "v101",
    //           "duration": 10,
    //           "learnedDuration": 10,
    //           "name": "Introduction to Vue.js",
    //           "video": "4deVCNJqv5w",
    //           "rightType": "md",
    //           "left": "# What is Vue.js?\n\nDownload it HERE!!!",
    //           "right": "# What is Vue.js?\n\nVue.js is a progressive JavaScript framework for building user interfaces. It is designed to be incrementally adaptable and focuses on declarative rendering and component composition.",
    //           "downloads": [
    //             {
    //               "file_name": "Sample Project Code",
    //               "file_link": "https://github.com/vuejs/vue/archive/refs/heads/main.zip"
    //             }
    //           ],
    //           "learn": [
    //             "Understand what Vue.js is and why it's used",
    //             "Learn about Vue's reactive data system",
    //             "Explore how Vue efficiently updates the UI"
    //           ],
    //           "skills": [
    //             "JavaScript",
    //             "Vue Basics",
    //             "Component-based Development"
    //           ]
    //         },
    //         {
    //           "title": "Vue Directives and Rendering",
    //           "id": "v102",
    //           "duration": 15,
    //           "learnedDuration": 0,
    //           "name": "Introduction to Vue.js",
    //           "video": "Gd7OBKK5lAs",
    //           "rightType": "code",
    //           "left": "# Vue Directives\n\nDownload it HERE!!!",
    //           "right": "<html><body><pre><code>&lt;div id=\"app\"&gt;\n  &lt;p v-if=\"seen\"&gt;Now you see me&lt;/p&gt;\n&lt;/div&gt;\n\n&lt;script&gt;\n  var app = new Vue({\n    el: '#app',\n    data: {\n      seen: true\n    }\n  });\n&lt;/script&gt;</code></pre></body></html>",
    //           "downloads": [
    //             {
    //               "file_name": "Sample Project Code",
    //               "file_link": "https://github.com/vuejs/vue/archive/refs/heads/main.zip"
    //             }
    //           ],
    //           "learn": [
    //             "Learn Vue directives like v-if and v-for",
    //             "Understand how rendering works in Vue.js",
    //             "Explore data binding and event handling in Vue"
    //           ],
    //           "skills": [
    //             "Vue Directives",
    //             "Reactive Rendering",
    //             "JavaScript Expressions"
    //           ]
    //         },
    //         {
    //           "title": "Vue Computed Properties and Watchers",
    //           "id": "v103",
    //           "duration": 20,
    //           "learnedDuration": 0,
    //           "name": "Vue Computed Properties and Watchers",
    //           "video": "N9J5NqYkT9E",
    //           "rightType": "md",
    //           "left": "# Vue Computed Properties and Watchers\n\nDownload it HERE!!!",
    //           "right": "# Computed Properties\n\nComputed properties are a way to compute values based on data, and Vue will cache them unless their dependencies change.\n\n# Watchers\n\nWatchers let you run code in response to data changes.",
    //           "downloads": [
    //             {
    //               "file_name": "Computed and Watcher Example Code",
    //               "file_link": "https://github.com/vuejs/vue/archive/refs/heads/main.zip"
    //             }
    //           ],
    //           "learn": [
    //             "Understand computed properties in Vue.js",
    //             "Learn how to use watchers for responding to data changes",
    //             "Explore caching in computed properties"
    //           ],
    //           "skills": [
    //             "Vue Computed Properties",
    //             "Vue Watchers",
    //             "Data Binding"
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       "name": "Vue.js Advanced Concepts",
    //       "description": "Dive deeper into Vue.js with advanced concepts, tools, and techniques.",
    //       "lessons": [
    //         {
    //           "title": "Vuex for State Management",
    //           "id": "v201",
    //           "duration": 25,
    //           "learnedDuration": 0,
    //           "name": "Vuex for State Management",
    //           "video": "vDFaF-Q9v_w",
    //           "rightType": "md",
    //           "left": "# Vuex for State Management\n\nDownload it HERE!!!",
    //           "right": "# Vuex\n\nVuex is a state management library for Vue.js applications. It provides centralized storage for all the components in an application and ensures that the state can only be mutated in a predictable way.",
    //           "downloads": [
    //             {
    //               "file_name": "Vuex State Management Code",
    //               "file_link": "https://github.com/vuejs/vuex/archive/refs/heads/main.zip"
    //             }
    //           ],
    //           "learn": [
    //             "Learn the basics of Vuex",
    //             "Understand how to use Vuex for state management",
    //             "Explore Vuex modules, getters, and actions"
    //           ],
    //           "skills": [
    //             "Vuex",
    //             "State Management",
    //             "JavaScript"
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // }
    // {
    //   _id: "2",
    //   name: "Mastering Spring Boot",
    //   outside_img:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XSZtPYc8kwGiDxiY58seQWMbV-s-0pjMag&s",
    //   description:
    //     "Learn how to build robust backend applications with Spring Boot.",
    //   course_number: 18,
    //   price: 79.99,
    //   views: 875,
    //   selectedLessonId: null,
    //   learn: [
    //     "Setting up a Spring Boot project",
    //     "Building RESTful APIs",
    //     "Database integration with JPA/Hibernate",
    //     "Spring Security for authentication",
    //     "Deploying Spring Boot applications",
    //   ],
    //   skills: ["Spring Boot", "Java", "REST APIs", "SQL", "Authentication"],
    //   chapters: [
    //     {
    //       name: "Introduction to Spring Boot",
    //       description: "Learn the fundamentals of Spring Boot and its setup.",
    //       lessons: [
    //         {
    //           title: "What is Spring Boot?",
    //           id: "sb101",
    //           duration: 14,
    //           learnedDuration: 0,
    //           name: "Introduction to Spring Boot",
    //           rightType: "code",
    //         },
    //         {
    //           title: "Spring Boot Starter",
    //           id: "sb102",
    //           duration: 20,
    //           learnedDuration: 0,
    //           name: "Introduction to Spring Boot",
    //           rightType: "md",
    //           right:
    //             "# What is React?\n\nReact is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the UI when data changes.",
    //         },
    //       ],
    //     },
    //     {
    //       name: "Building APIs",
    //       description:
    //         "Understand how to create RESTful APIs using Spring Boot.",
    //       lessons: [
    //         {
    //           title: "REST Controller Basics",
    //           id: "sb201",
    //           duration: 16,
    //           learnedDuration: 0,
    //           name: "Building APIs",
    //           rightType: "code",
    //         },
    //         {
    //           title: "Handling Requests and Responses",
    //           id: "sb202",
    //           duration: 22,
    //           learnedDuration: 0,
    //           name: "Building APIs",
    //           rightType: "md",
    //           right:
    //             "# What is React?\n\nReact is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the UI when data changes.",
    //         },
    //       ],
    //     },
    //   ],
    // },
    //     {
    //   "name": "Full-Stack Web Development",
    //   "outside_img": "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190626123927/untitlsssssed.png",
    //   "description": "Master front-end and back-end development with modern tools.",
    //   "price": 99.99,
    //   "subscribe": "premium",
    //   "learn": [
    //     { "learning_item": "React for front-end development" },
    //     { "learning_item": "Node.js and Express for back-end" },
    //     { "learning_item": "MongoDB for database storage" },
    //     { "learning_item": "Authentication and authorization" },
    //     { "learning_item": "Deploying full-stack applications" }
    //   ],
    //   "skills": [
    //     { "skill_item": "React" },
    //     { "skill_item": "Node.js" },
    //     { "skill_item": "Express" },
    //     { "skill_item": "MongoDB" },
    //     { "skill_item": "Authentication" }
    //   ],
    //   "chapters": [
    //     {
    //       "name": "Introduction to Full-Stack Development",
    //       "description": "Understand the basics of full-stack web development.",
    //       "lessons": [
    //         {
    //           "title": "What is Full-Stack?",
    //           "rightType": "code",
    //           "right": null,
    //           "left": null,
    //           "skills": [
    //             { "lesson_skill": "Full-stack overview" }
    //           ],
    //           "learn": [
    //             { "lesson_learn": "Understand front-end and back-end roles" }
    //           ],
    //           "downloads": [
    //             {
    //               "file_name": "fullstack-overview.pdf",
    //               "file_link": "https://example.com/downloads/fullstack-overview.pdf"
    //             }
    //           ]
    //         },
    //         {
    //           "title": "Tech Stack Overview",
    //           "rightType": "md",
    //           "right": "# What is React?\n\nReact is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the UI when data changes.",
    //           "left": null,
    //           "skills": [
    //             { "lesson_skill": "React basics" }
    //           ],
    //           "learn": [
    //             { "lesson_learn": "Recognize components of a tech stack" }
    //           ],
    //           "downloads": [
    //             {
    //               "file_name": "tech-stack-cheatsheet.pdf",
    //               "file_link": "https://example.com/downloads/tech-stack-cheatsheet.pdf"
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       "name": "Building the Front-End",
    //       "description": "Learn how to develop a modern front-end with React.",
    //       "lessons": [
    //         {
    //           "title": "React Component Basics",
    //           "rightType": "md",
    //           "right": "# What is React?\n\nReact is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the UI when data changes.",
    //           "left": null,
    //           "skills": [
    //             { "lesson_skill": "Component structure" }
    //           ],
    //           "learn": [
    //             { "lesson_learn": "Create reusable components" }
    //           ],
    //           "downloads": [
    //             {
    //               "file_name": "react-component-basics.zip",
    //               "file_link": "https://example.com/downloads/react-component-basics.zip"
    //             }
    //           ]
    //         },
    //         {
    //           "title": "State and Props in React",
    //           "rightType": "md",
    //           "right": "# What is React?\n\nReact is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the UI when data changes.",
    //           "left": null,
    //           "skills": [
    //             { "lesson_skill": "React state" },
    //             { "lesson_skill": "React props" }
    //           ],
    //           "learn": [
    //             { "lesson_learn": "Pass data between components" }
    //           ],
    //           "downloads": [
    //             {
    //               "file_name": "state-vs-props-guide.pdf",
    //               "file_link": "https://example.com/downloads/state-vs-props-guide.pdf"
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       "name": "Developing the Back-End",
    //       "description": "Understand how to set up a Node.js and Express server.",
    //       "lessons": [
    //         {
    //           "title": "Setting Up Express Server",
    //           "rightType": "code",
    //           "right": null,
    //           "left": null,
    //           "skills": [
    //             { "lesson_skill": "Express setup" }
    //           ],
    //           "learn": [
    //             { "lesson_learn": "Initialize a basic Express app" }
    //           ],
    //           "downloads": [
    //             {
    //               "file_name": "express-setup.zip",
    //               "file_link": "https://example.com/downloads/express-setup.zip"
    //             }
    //           ]
    //         },
    //         {
    //           "title": "Building RESTful APIs",
    //           "rightType": "code",
    //           "right": null,
    //           "left": null,
    //           "skills": [
    //             { "lesson_skill": "REST API" }
    //           ],
    //           "learn": [
    //             { "lesson_learn": "Design API endpoints using Express" }
    //           ],
    //           "downloads": [
    //             {
    //               "file_name": "rest-api-example.zip",
    //               "file_link": "https://example.com/downloads/rest-api-example.zip"
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // }

    // {
    //   _id: "4",
    //   name: "Kotlin for Android Development",
    //   outside_img:
    //     "https://tamediacdn.techaheadcorp.com/wp-content/uploads/2023/11/16044253/Kotlin-Programming-for-Android-App-Development.webp",
    //   description:
    //     "Learn to build modern Android applications using Kotlin and Jetpack.",
    //   course_number: 15,
    //   price: 59.99,
    //   views: 956,
    //   learn: [
    //     "Setting up Android Studio",
    //     "Building UI with Jetpack Compose",
    //     "Handling user interactions",
    //     "Using Room Database for storage",
    //     "Implementing RESTful APIs in Android",
    //   ],
    //   skills: ["Kotlin", "Android", "Jetpack Compose", "Room Database"],
    //   chapters: [
    //     {
    //       name: "Getting Started with Kotlin",
    //       description: "Learn the basics of Kotlin programming for Android.",
    //       lessons: [
    //         {
    //           title: "Introduction to Kotlin",
    //           id: "kt101",
    //           duration: 35,
    //           learnedDuration: 15,
    //           name: "Getting Started with Kotlin",
    //           rightType: "md",
    //           right:
    //             "# What is React?\n\nReact is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the UI when data changes.",
    //         },
    //         {
    //           title: "Kotlin Syntax and Basics",
    //           id: "kt102",
    //           duration: 50,
    //           learnedDuration: 20,
    //           name: "Getting Started with Kotlin",
    //           rightType: "md",
    //           right:
    //             "# What is React?\n\nReact is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the UI when data changes.",
    //         },
    //       ],
    //     },
    //     {
    //       name: "Android UI with Jetpack Compose",
    //       description: "Build interactive UIs using Jetpack Compose.",
    //       lessons: [
    //         {
    //           title: "Composable Functions",
    //           id: "kt201",
    //           duration: 45,
    //           learnedDuration: 25,
    //           name: "Android UI with Jetpack Compose",
    //           rightType: "code",
    //         },
    //         {
    //           title: "Handling User Input",
    //           id: "kt202",
    //           duration: 55,
    //           learnedDuration: 30,
    //           name: "Android UI with Jetpack Compose",
    //           rightType: "code",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   _id: "5",
    //   name: "Data Science with Python",
    //   outside_img:
    //     "https://i0.wp.com/junilearning.com/wp-content/uploads/2020/06/python-programming-language.webp?fit=1920%2C1920&ssl=1",
    //   description:
    //     "Analyze data and build machine learning models with Python.",
    //   course_number: 22,
    //   price: 89.99,
    //   views: 1102,
    //   learn: [
    //     "Data manipulation with Pandas",
    //     "Data visualization with Matplotlib and Seaborn",
    //     "Building machine learning models with Scikit-Learn",
    //     "Deep learning with TensorFlow",
    //     "Deploying ML models",
    //   ],
    //   skills: ["Python", "Data Science", "Machine Learning", "Pandas"],
    //   chapters: [
    //     {
    //       name: "Introduction to Data Science",
    //       description:
    //         "Understand the fundamentals of data science and Python.",
    //       lessons: [
    //         {
    //           title: "What is Data Science?",
    //           id: "ds101",
    //           duration: 40,
    //           learnedDuration: 20,
    //           name: "Introduction to Data Science",
    //           rightType: "code",
    //         },
    //         {
    //           title: "Python for Data Science",
    //           id: "ds102",
    //           duration: 50,
    //           learnedDuration: 30,
    //           name: "Introduction to Data Science",
    //           rightType: "code",
    //         },
    //       ],
    //     },
    //     {
    //       name: "Data Manipulation",
    //       description: "Learn how to clean and process data using Pandas.",
    //       lessons: [
    //         {
    //           title: "Working with Pandas",
    //           id: "ds201",
    //           duration: 45,
    //           learnedDuration: 45,
    //           name: "Data Manipulation",
    //           rightType: "md",
    //           right:
    //             "# What is React?\n\nReact is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the UI when data changes.",
    //         },
    //         {
    //           title: "Data Cleaning Techniques",
    //           id: "ds202",
    //           duration: 55,
    //           learnedDuration: 30,
    //           name: "Data Manipulation",
    //           rightType: "code",
    //         },
    //       ],
    //     },
    //     {
    //       name: "Machine Learning Basics",
    //       description: "Explore machine learning concepts with Scikit-Learn.",
    //       lessons: [
    //         {
    //           title: "Supervised Learning",
    //           id: "ds301",
    //           duration: 60,
    //           learnedDuration: 35,
    //           name: "Machine Learning Basics",
    //           rightType: "code",
    //         },
    //         {
    //           title: "Unsupervised Learning",
    //           id: "ds302",
    //           duration: 70,
    //           learnedDuration: 40,
    //           name: "Machine Learning Basics",
    //           rightType: "code",
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      name: "Web Development with Django and React",
      outside_img:
        "https://shelokuma.com/wp-content/uploads/2024/10/88b04dc6529a1e2120c20794834675f1.png",
      description:
        "Learn how to build dynamic web applications using Django and React.",
      course_number: 15,
      price: 109.99,
      views: 2500,
      learn: [
        "Setting up Django for web development",
        "Building REST APIs with Django REST Framework",
        "Integrating React with Django",
        "Authentication and Authorization",
        "Deploying full-stack applications",
      ],
      skills: ["Django", "React", "Web Development", "REST APIs"],
      chapters: [
        {
          name: "Getting Started with Django",
          description:
            "Learn the basics of Django and how to set up a project.",
          lessons: [
            {
              title: "Setting up Django Project",
              id: "wd101",
              duration: 45,
              learnedDuration: 25,
              name: "Getting Started with Django",
              rightType: "code",
            },
            {
              title: "Django Models and Views",
              id: "wd102",
              duration: 50,
              learnedDuration: 30,
              name: "Getting Started with Django",
              rightType: "code",
            },
          ],
        },
        {
          name: "Building APIs with Django REST Framework",
          description:
            "Understand how to build RESTful APIs with Django REST Framework.",
          lessons: [
            {
              title: "Setting up Django REST Framework",
              id: "wd201",
              duration: 60,
              learnedDuration: 40,
              name: "Building APIs with Django REST Framework",
              rightType: "code",
            },
            {
              title: "Creating API Endpoints",
              id: "wd202",
              duration: 55,
              learnedDuration: 35,
              name: "Building APIs with Django REST Framework",
              rightType: "code",
            },
          ],
        },
        {
          name: "React for Frontend Development",
          description:
            "Learn how to use React to build the frontend of your web application.",
          lessons: [
            {
              title: "Introduction to React",
              id: "wd301",
              duration: 50,
              learnedDuration: 25,
              name: "React for Frontend Development",
              rightType: "code",
            },
            {
              title: "React Components and State Management",
              id: "wd302",
              duration: 60,
              learnedDuration: 30,
              name: "React for Frontend Development",
              rightType: "code",
            },
          ],
        },
      ],
    },
    {
      name: "Mobile App Development with Flutter",
      outside_img:
        "https://techvify-software.com/wp-content/uploads/2023/06/flutter-app-development.png",
      description:
        "Master mobile app development using Flutter to create cross-platform apps.",
      course_number: 18,
      price: 129.99,
      views: 1800,
      learn: [
        "Setting up Flutter development environment",
        "Building basic Flutter apps",
        "State management in Flutter",
        "Integrating APIs in Flutter",
        "Deploying apps to Android and iOS",
      ],
      skills: ["Flutter", "Mobile Development", "Cross-Platform Apps", "Dart"],
      chapters: [
        {
          name: "Introduction to Flutter",
          description:
            "Learn the basics of Flutter and set up your development environment.",
          lessons: [
            {
              title: "Installing Flutter and Setting Up Your IDE",
              id: "ma101",
              duration: 45,
              learnedDuration: 25,
              name: "Introduction to Flutter",
              rightType: "code",
            },
            {
              title: "Creating Your First Flutter App",
              id: "ma102",
              duration: 60,
              learnedDuration: 30,
              name: "Introduction to Flutter",
              rightType: "code",
            },
          ],
        },
        {
          name: "Widgets and Layouts",
          description:
            "Learn how to use Flutter widgets and layouts to build beautiful UIs.",
          lessons: [
            {
              title: "Working with Flutter Widgets",
              id: "ma201",
              duration: 50,
              learnedDuration: 30,
              name: "Widgets and Layouts",
              rightType: "code",
            },
            {
              title: "Building Complex Layouts",
              id: "ma202",
              duration: 55,
              learnedDuration: 35,
              name: "Widgets and Layouts",
              rightType: "code",
            },
          ],
        },
        {
          name: "State Management in Flutter",
          description:
            "Understand state management techniques in Flutter for dynamic apps.",
          lessons: [
            {
              title: "Understanding Stateful Widgets",
              id: "ma301",
              duration: 55,
              learnedDuration: 30,
              name: "State Management in Flutter",
              rightType: "code",
            },
            {
              title: "Using Provider for State Management",
              id: "ma302",
              duration: 65,
              learnedDuration: 40,
              name: "State Management in Flutter",
              rightType: "code",
            },
          ],
        },
      ],
    },
    {
      name: "Cybersecurity Fundamentals",
      outside_img:
        "https://eu-images.contentstack.com/v3/assets/blt69509c9116440be8/blt8ffb90a2f64bacfa/6776f4544b281ca5e2bc465a/cybersecurity_NicoElNino-AlamyStockPhoto.jpg",
      description:
        "Learn the fundamentals of cybersecurity to protect systems and data.",
      course_number: 30,
      price: 99.99,
      views: 2100,
      learn: [
        "Understanding cybersecurity threats",
        "Network security principles",
        "Ethical hacking and penetration testing",
        "Cryptography basics",
        "Best practices for securing systems",
      ],
      skills: [
        "Cybersecurity",
        "Ethical Hacking",
        "Network Security",
        "Cryptography",
      ],
      chapters: [
        {
          name: "Introduction to Cybersecurity",
          description: "Learn the basics of cybersecurity and common threats.",
          lessons: [
            {
              title: "Understanding Cyber Threats",
              id: "cs101",
              duration: 40,
              learnedDuration: 20,
              name: "Introduction to Cybersecurity",
              rightType: "code",
            },
            {
              title: "Types of Cyber Attacks",
              id: "cs102",
              duration: 50,
              learnedDuration: 30,
              name: "Introduction to Cybersecurity",
              rightType: "code",
            },
          ],
        },
        {
          name: "Network Security",
          description: "Learn about firewalls, VPNs, and securing networks.",
          lessons: [
            {
              title: "Firewalls and Intrusion Detection",
              id: "cs201",
              duration: 55,
              learnedDuration: 35,
              name: "Network Security",
              rightType: "code",
            },
            {
              title: "Securing Wireless Networks",
              id: "cs202",
              duration: 60,
              learnedDuration: 40,
              name: "Network Security",
              rightType: "code",
            },
          ],
        },
        {
          name: "Ethical Hacking and Cryptography",
          description:
            "Understand penetration testing and cryptographic techniques.",
          lessons: [
            {
              title: "Penetration Testing Basics",
              id: "cs301",
              duration: 70,
              learnedDuration: 45,
              name: "Ethical Hacking and Cryptography",
              rightType: "code",
            },
            {
              title: "Introduction to Cryptography",
              id: "cs302",
              duration: 65,
              learnedDuration: 35,
              name: "Ethical Hacking and Cryptography",
              rightType: "code",
            },
          ],
        },
      ],
    },
    {
      name: "Game Development with Unity",
      outside_img:
        "https://upload.wikimedia.org/wikipedia/commons/0/06/Unity_3D_logo.png",
      description:
        "Learn how to create 2D and 3D games using Unity, one of the most popular game development platforms.",
      course_number: 12,
      price: 149.99,
      views: 3000,
      learn: [
        "Setting up Unity and creating your first project",
        "Designing 2D and 3D environments",
        "Scripting with C# in Unity",
        "Implementing physics and animations",
        "Publishing games to different platforms",
      ],
      skills: ["Unity", "C#", "Game Development", "3D Design"],
      chapters: [
        {
          name: "Getting Started with Unity",
          description:
            "Learn the basics of Unity and set up your first game project.",
          lessons: [
            {
              title: "Installing Unity and Setting Up Your Project",
              id: "gd101",
              duration: 50,
              learnedDuration: 30,
              name: "Getting Started with Unity",
              rightType: "code",
            },
            {
              title: "Exploring the Unity Interface",
              id: "gd102",
              duration: 45,
              learnedDuration: 25,
              name: "Getting Started with Unity",
              rightType: "code",
            },
          ],
        },
        {
          name: "Creating 2D Games in Unity",
          description:
            "Learn the process of building 2D games in Unity using sprites and basic physics.",
          lessons: [
            {
              title: "Building 2D Environments",
              id: "gd201",
              duration: 60,
              learnedDuration: 40,
              name: "Creating 2D Games in Unity",
              rightType: "code",
            },
            {
              title: "Scripting Player Movement and Collisions",
              id: "gd202",
              duration: 70,
              learnedDuration: 45,
              name: "Creating 2D Games in Unity",
              rightType: "code",
            },
          ],
        },
        {
          name: "Building 3D Games in Unity",
          description:
            "Dive into 3D game development and learn how to work with 3D models and animations.",
          lessons: [
            {
              title: "Setting Up 3D Game Objects",
              id: "gd301",
              duration: 65,
              learnedDuration: 40,
              name: "Building 3D Games in Unity",
              rightType: "code",
            },
            {
              title: "Implementing 3D Physics and Animations",
              id: "gd302",
              duration: 75,
              learnedDuration: 50,
              name: "Building 3D Games in Unity",
              rightType: "code",
            },
          ],
        },
      ],
    },
    {
      name: "Artificial Intelligence with TensorFlow",
      outside_img:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/TensorFlow_logo.svg/1200px-TensorFlow_logo.svg.png",
      description:
        "Learn how to build AI models using TensorFlow, one of the leading frameworks for machine learning and deep learning.",
      course_number: 16,
      price: 219.99,
      views: 3500,
      learn: [
        "Setting up TensorFlow environment",
        "Building and training machine learning models",
        "Working with deep learning and neural networks",
        "Image and text classification with TensorFlow",
        "Optimizing models for production",
        "Deploying AI models to production",
      ],
      skills: [
        "TensorFlow",
        "Machine Learning",
        "Deep Learning",
        "AI",
        "Neural Networks",
      ],
      chapters: [
        {
          name: "Introduction to TensorFlow",
          description:
            "Learn how to set up TensorFlow and build your first machine learning model.",
          lessons: [
            {
              title: "Installing TensorFlow and Setup",
              id: "ai101",
              duration: 45,
              learnedDuration: 30,
              name: "Introduction to TensorFlow",
              rightType: "code",
            },
            {
              title: "Understanding TensorFlow Basics",
              id: "ai102",
              duration: 50,
              learnedDuration: 35,
              name: "Introduction to TensorFlow",
              rightType: "code",
            },
          ],
        },
        {
          name: "Building Machine Learning Models with TensorFlow",
          description:
            "Learn how to build and train machine learning models with TensorFlow.",
          lessons: [
            {
              title: "Creating Linear Regression Models",
              id: "ai201",
              duration: 60,
              learnedDuration: 45,
              name: "Building Machine Learning Models with TensorFlow",
              rightType: "code",
            },
            {
              title: "Building Classification Models",
              id: "ai202",
              duration: 75,
              learnedDuration: 55,
              name: "Building Machine Learning Models with TensorFlow",
              rightType: "code",
            },
          ],
        },
        {
          name: "Deep Learning and Neural Networks",
          description:
            "Dive deeper into deep learning and learn how to build neural networks using TensorFlow.",
          lessons: [
            {
              title: "Understanding Neural Networks",
              id: "ai301",
              duration: 80,
              learnedDuration: 60,
              name: "Deep Learning and Neural Networks",
              rightType: "code",
            },
            {
              title: "Building Deep Neural Networks",
              id: "ai302",
              duration: 90,
              learnedDuration: 70,
              name: "Deep Learning and Neural Networks",
              rightType: "code",
            },
          ],
        },
        {
          name: "AI for Image and Text Classification",
          description:
            "Learn how to build AI models for image and text classification using TensorFlow.",
          lessons: [
            {
              title:
                "Image Classification with Convolutional Neural Networks (CNNs)",
              id: "ai401",
              duration: 85,
              learnedDuration: 65,
              name: "AI for Image and Text Classification",
              rightType: "code",
            },
            {
              title:
                "Text Classification with Recurrent Neural Networks (RNNs)",
              id: "ai402",
              duration: 90,
              learnedDuration: 70,
              name: "AI for Image and Text Classification",
              rightType: "code",
            },
          ],
        },
        {
          name: "Optimizing and Deploying AI Models",
          description:
            "Learn how to optimize and deploy your TensorFlow models to production environments.",
          lessons: [
            {
              title: "Model Optimization Techniques",
              id: "ai501",
              duration: 70,
              learnedDuration: 50,
              name: "Optimizing and Deploying AI Models",
              rightType: "code",
            },
            {
              title:
                "Deploying AI Models to Production with TensorFlow Serving",
              id: "ai502",
              duration: 80,
              learnedDuration: 60,
              name: "Optimizing and Deploying AI Models",
              rightType: "code",
            },
          ],
        },
      ],
    },
  ],
};
