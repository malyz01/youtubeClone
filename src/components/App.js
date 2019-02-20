import React from "react";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import youtube from "../apis/youtube";
import Scroll from "./Scroll";

class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null,
    term: "",
    next: "",
    prev: "",
    page: "",
    hide: true
  };

  componentDidMount() {
    this.onTermSubmit("worlds most obedient cat");
  }

  onTermSubmit = async term => {
    if (term !== this.state.term) {
      await this.setState({
        page: "",
        next: "",
        prev: ""
      });
    }

    const response = await youtube.get("/search", {
      params: {
        q: term,
        type: "video",
        pageToken: this.state.page
      }
    });

    if (response.data.prevPageToken) {
      this.setState({ hide: false });
    } else {
      this.setState({ hide: true });
    }

    this.setState({
      term,
      videos: response.data.items,
      selectedVideo: response.data.items[0],
      next: response.data.nextPageToken,
      prev: response.data.prevPageToken ? response.data.prevPageToken : ""
    });

    console.log(this.state);
  };

  onVideoSelect = video => {
    this.setState({ selectedVideo: video });
  };

  onBtnClick = async page => {
    await this.setState({ page: page });
    this.onTermSubmit(this.state.term);
  };

  render() {
    const style = this.state.hide ? { display: "none" } : {};
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail selectedVideo={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <Scroll>
                <VideoList
                  videos={this.state.videos}
                  onVideoSelect={this.onVideoSelect}
                />
              </Scroll>
              <div className="four column row" style={{ marginTop: "10px" }}>
                <button
                  style={style}
                  className="ui labeled icon button left floated column"
                  onClick={() => this.onBtnClick(this.state.prev)}
                >
                  <i className="left arrow icon" />
                  Prev
                </button>
                <button
                  className="ui right labeled icon button right floated column"
                  onClick={() => this.onBtnClick(this.state.next)}
                >
                  <i className="right arrow icon" />
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
