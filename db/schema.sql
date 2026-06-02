-- School/Madrasah ERP schema (scaffold)

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  role_id INT REFERENCES roles(id),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  name VARCHAR(255),
  class_id INT,
  section VARCHAR(10),
  roll INT,
  photo VARCHAR(255)
);

CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  name VARCHAR(255),
  designation VARCHAR(255),
  department VARCHAR(255)
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  name VARCHAR(255),
  designation VARCHAR(255),
  department VARCHAR(255)
);

CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  section VARCHAR(10),
  capacity INT
);

CREATE TABLE subjects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  code VARCHAR(100),
  class_id INT REFERENCES classes(id),
  teacher_id INT REFERENCES teachers(id)
);

CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  date DATE,
  status VARCHAR(50),
  remarks TEXT
);

CREATE TABLE homework (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  class_id INT,
  section VARCHAR(10),
  due_date DATE,
  attachment VARCHAR(255),
  created_by INT REFERENCES teachers(id)
);

CREATE TABLE question_bank (
  id SERIAL PRIMARY KEY,
  subject_id INT REFERENCES subjects(id),
  chapter VARCHAR(255),
  type VARCHAR(50),
  question TEXT,
  options JSONB,
  answer TEXT,
  marks INT
);

CREATE TABLE question_papers (
  id SERIAL PRIMARY KEY,
  subject_id INT REFERENCES subjects(id),
  class_id INT REFERENCES classes(id),
  exam_name VARCHAR(255),
  total_marks INT,
  pdf_url VARCHAR(255)
);

CREATE TABLE exams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  class_id INT,
  subject_id INT,
  date DATE
);

CREATE TABLE exam_marks (
  id SERIAL PRIMARY KEY,
  exam_id INT REFERENCES exams(id),
  student_id INT REFERENCES students(id),
  subject_id INT REFERENCES subjects(id),
  obtained_marks INT
);

CREATE TABLE test_marks (
  id SERIAL PRIMARY KEY,
  test_name VARCHAR(255),
  student_id INT REFERENCES students(id),
  marks INT
);

CREATE TABLE behaviour_skills (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  behaviour JSONB
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INT,
  receiver_id INT,
  content TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE live_classes (
  id SERIAL PRIMARY KEY,
  subject_id INT,
  teacher_id INT,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  meeting_link VARCHAR(255)
);

CREATE TABLE report_cards (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  term VARCHAR(50),
  gpa NUMERIC,
  details JSONB
);
