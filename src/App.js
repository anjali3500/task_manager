import React, { useState, useEffect } from "react";
import "./App.css";

export default function Home() {
  //collect the post-list from localstorage and parse it with JSON.parse() method
  const postsData = JSON.parse(localStorage.getItem("posts"));
  //initilize our parsed data if there is no data inside our initial state will be set as empty array []
  const [posts, setPosts] = useState(postsData || []);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [all,allEvents]=useState(false);
  

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleTime = (e) => {
    setTime(e.target.value);
  };
  const AddPost = (e) => {
    e.preventDefault();
    setPosts([
      ...posts,
      {
        title,
        message,
        date,
        time,
      },
    ]);
    //to clear the box
    setTitle("");
    setMessage("");
    setDate("");
    setTime("");
  };
  const removePost = (title) => {
    //removePost take title as argument
    //let's reset the post list after filtering post title which are not equal to title
    setPosts(posts.filter((item) => item.title !== title));
  };

  // const sortedActivities = activities.postsData((a, b) => b.date - a.date)

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  });

  
    posts.sort(function(a,b){
      if(new Date(a.date) - new Date(b.date) === 0)
        return a.time.localeCompare(b.time);
      return new Date(a.date) - new Date(b.date);
    })
    

  return (
    <div className="Section__one row">
      <center>
        <h1>Task Manager</h1>
      </center>

      <div className="local__storage sectionss ">
        <div>
          <form onSubmit={AddPost}>
            <div className="form-container flex">
              <label htmlFor="title" className="label">
                {" "}
                Task Name{" "}
              </label>
              <input
                type="text"
                value={title}
                onChange={handleTitle}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="label">
                {" "}
                Task Description
              </label>
              <textarea
                type="text"
                value={message}
                rows="4"
                onChange={handleMessage}
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="label">
                Date and Time
              </label>
              {/* <DateTimePickerComponent id="datetimepicker" value={time} onChange={handleTime}/> */}
              <input type="date" value={date} onChange={handleDate} required />
              <input
                type="time"
                value={time}
                id="birthdaytime"
                name="birthdaytime"
                onChange={handleTime}
                required
              />
              {/* <textarea type="text" value={message} rows="4" onChange={handleMessage} required /> */}
            </div>

            <button type="submit">Add Post</button>
          </form>
        </div>

        <div></div>
        <div className="scroll" >
          <button  className="Button_de" onClick={() => allEvents(true) }>All</button>
          <button className="Button_de" onClick={() =>allEvents(false) }>Upcoming</button>
          


          
          {all? posts.map((item) => (
            //remember to set the key , each item need to have a key
            <div className="post" key={item.title}>
              <h3>Task:{item.title}</h3>
              <p>Description:{item.message}</p>
              <p>
                Time:{item.date} ,{item.time}
              </p>

              <span className="close__buttons">
                <button onClick={() => removePost(item.title)}>X</button>
              </span>
            </div>
          )):posts.slice(0,3).map((item) => (
            //remember to set the key , each item need to have a key
            <div className="post" key={item.title}>
              <h3>Task:{item.title}</h3>
              <p>Description:{item.message}</p>
              <p>
                Time:{item.date} ,{item.time}
              </p>

              <span className="close__buttons">
                <button onClick={() => removePost(item.title)}>X</button>
              </span>
            </div>
          ))}
        </div>

        <div>
         
        </div>
      </div>
    </div>
  );
}
