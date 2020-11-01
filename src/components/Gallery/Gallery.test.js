import { render } from "@testing-library/react";
import * as React from "react";
import Gallery from "./Gallery";

test("renders", () => {
  render(
    <Gallery
      items={[
        {
          author: `nobody@flickr.com ("wallygrom")`,
          author_id: "33037982@N04",
          date_taken: "2020-10-31T11:09:17-08:00",
          link: "https://www.flickr.com/photos/33037982@N04/50553500313/",
          media: {
            m:
              "https://live.staticflickr.com/65535/50553500313_5a5073b4a4_m.jpg",
          },
          tags:
            "england westsussex ferring scarecrowtrail halloween autumn goring rain weather",
          title: "The rain fell down",
        },
      ]}
    />
  );
});
