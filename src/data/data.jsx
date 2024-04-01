export const sessionsData = [
  {
    Id: 1,
    Subject: "analyse numerique",
    StartTime: new Date(2018, 1, 15, 10, 0),
    EndTime: new Date(2018, 1, 15, 11, 0),
    Color: "green",
  },
  {
    Id: 2,
    Subject: "nest js",
    StartTime: new Date(2018, 1, 15, 11, 0),
    EndTime: new Date(2018, 1, 15, 12, 0),
    Color: "blue",
  },
  {
    Id: 3,
    Subject: "react js",
    StartTime: new Date(2018, 1, 15, 12, 0),
    EndTime: new Date(2018, 1, 15, 13, 0),
    Color: "beige"
  },
  {
    Id: 4,
    Subject: "marketing",
    StartTime: new Date(2018, 1, 15, 14, 0),
    EndTime: new Date(2018, 1, 15, 15, 0),
    Color:"green"
  },
  {
    Id: 5,
    Subject: "seo",
    StartTime: new Date(2018, 1, 14, 10, 0),
    EndTime: new Date(2018, 1, 14, 11, 0),
    Color: "blue",
  },
  {
    Id: 6,
    Subject: "sea",
    StartTime: new Date(2018, 1, 14, 11, 0),
    EndTime: new Date(2018, 1, 14, 12, 0),
    Color: "beige",
  },
  {
    Id: 7,
    Subject: "angular",
    StartTime: new Date(2018, 1, 14, 12, 0),
    EndTime: new Date(2018, 1, 14, 13, 0),
    Color: "green",
  },
  {
    Id: 8,
    Subject: "ionic",
    StartTime: new Date(2018, 1, 14, 14, 0),
    EndTime: new Date(2018, 1, 14, 15, 0),
    Color: "blue",
  },
];

export const Tasks = [
  {
    Id: 1,
    Session_ID: 1,
    Title: "Méthode de Gauss",
    isDone: true,
  },
  {
    Id: 2,
    Session_ID: 1,
    Title: "Méthode de Jacobi",
    isDone: false,
  },
  {
    Id: 3,
    Session_ID: 2,
    Title: "Controllers",
    isDone: false,
  },
  {
    Id: 4,
    Session_ID: 2,
    Title: "Services",
    isDone: false,
  },
  {
    Id: 5,
    Session_ID: 3,
    Title: "Hooks",
    isDone: false,
  },
  {
    Id: 6,
    Session_ID: 3,
    Title: "Context",
    isDone: true,
  },
  {
    Id: 7,
    Session_ID: 4,
    Title: "SEO",
    isDone: false,
  },
  {
    Id: 8,
    Session_ID: 4,
    Title: "SEA",
    isDone: true,
  },
];

export const questionsData = [
  {
    Id: 1,
    Session_ID: 1,
    Content: "What is the method of Gauss?",
    CreatedAt: new Date(2018, 1, 15, 10, 0),
    Author: "John Doe",
  },
  {
    Id: 2,
    Session_ID: 1,
    Content: "What is the method of Jacobi?",
    CreatedAt: new Date(2018, 1, 15, 10, 0),
    Author: "Jane Doe",
  },
  {
    Id: 3,
    Session_ID: 2,
    Content: "What are controllers?",
    CreatedAt: new Date(2018, 1, 15, 10, 0),
    Author: "alex",
  },
  {
    Id: 4,
    Session_ID: 2,
    Content: "What are services?",
    CreatedAt: new Date(2018, 1, 15, 10, 0),
    Author: "salem",
  },
  {
    Id: 5,
    Session_ID: 3,
    Content: "What are hooks?",
    CreatedAt: new Date(2018, 1, 15, 10, 0),
    Author: "mohamed",
  },
  {
    Id: 6,
    Session_ID: 3,
    Content: "What is context?",
    CreatedAt: new Date(2018, 1, 15, 10, 0),
    Author: "monji",
  },
  {
    Id: 7,
    Session_ID: 4,
    Content: "What is SEO?",
    CreatedAt: new Date(2018, 1, 15, 10, 0),
    Author: "hechmi",
  },
  {
    Id: 8,
    Session_ID: 4,
    Content: "What is SEA?",
    CreatedAt: new Date(2018, 1, 15, 10, 0),
    Author: "mohamed",
  },
];

export const answersData = [
  {
    Id: 1,
    Question_ID: 1,
    Content: "The method of Gauss is a method used to solve linear systems",
    CreatedAt: new Date(2018, 1, 15, 10, 0),
    Author: "prof1",
    ReplyTo: null,
  },
  {
    Id: 2,
    Question_ID: 2,
    Content: "The method of Jacobi is a method used to solve linear systems",
    CreatedAt: new Date(2018, 1, 15, 10, 0),
    Author: "prof2",
    ReplyTo: 1,
  },
  {
    Id: 3,
    Question_ID: 3,
    Content: "Controllers are the components that handle the incoming requests",
    CreatedAt: new Date(2018, 1, 15, 10, 0),
    Author: "prof3",
    ReplyTo: 1,
  },
  {
    Id: 4,
    Question_ID: 4,
    Content: "Services are the components that handle the business logic",
    CreatedAt: new Date(2018, 1, 15, 10, 0),
    Author: "prof4",
    ReplyTo: 2,
  },
  {
    Id: 5,
    Question_ID: 5,
    Content:
      "Hooks are functions that let you use state and other React features",
    CreatedAt: new Date(2018, 1, 15, 10, 0),
    Author: "prof5",
  },
  {
    Id: 6,
    Question_ID: 6,
    Content: "Context provides a way to pass data through the component tree",
    CreatedAt: new Date(2018, 1, 15, 10, 0),
    Author: "prof6",
  },
];
