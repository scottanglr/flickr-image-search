import { render } from "@testing-library/react";
import * as React from "react";
import GalleryImage from "./GalleryImage";

test("renders", () => {
  render(
    <GalleryImage
      image={""}
      author={""}
      tags={""}
      date={""}
      link={""}
      title={""}
      onLoad={() => {}}
    />
  );
});
