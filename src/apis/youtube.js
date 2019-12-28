import axios from "axios";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 10,
    key: "AIzaSyBmQ9w85yXGzlYMQouFDy4iiv6vAaq5ASU"
  }
});
