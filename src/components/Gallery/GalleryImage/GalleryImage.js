import "./GalleryImage.css";
import * as React from "react";

/**
 * Component to render image and details in gallery
 * @param {string} props.image
 * @param {string} props.author
 * @param {string} props.tags
 * @param {string} props.date
 * @param {string} props.link
 * @param {string} props.title
 * @param {()=>void} props.onLoad
 */
const GalleryImage = (props) => {
  const { image, author, tags, dateTaken, link, title, onLoad } = props;

  // Details open on hover, but this allows details to also be opened by clicking or tapping, which means that it works for mobile
  // Clicking again, moving the mouse elsewhere, or tapping elsewhere, closes the details
  const [keepDetailsOpen, setKeepDetailsOpen] = React.useState(false);

  const onToggleKeepDetailsOpenCallback = React.useCallback(() => {
    setKeepDetailsOpen(!keepDetailsOpen);
  }, [keepDetailsOpen]);

  const onSetKeepDetailsOpenOffCallback = React.useCallback(() => {
    setKeepDetailsOpen(false);
  }, []);

  // Author is always nobody@flickr.com ("actual username")
  // This strips out the email nobody@flickr.com
  // If a match is not found then it uses author as it originally was
  let userHandle;
  const match = /^nobody@flickr\.com \("(.*)"\)$/.exec(author);
  if (Array.isArray(match)) {
    userHandle = match[1]; //Match is always at position 1
  }

  return (
    <div
      className={
        "position-relative GalleryImage-wrapper" +
        (keepDetailsOpen ? " GalleryImage-keep-details-open" : "")
      }
      onMouseLeave={onSetKeepDetailsOpenOffCallback}
      onClick={onToggleKeepDetailsOpenCallback}
    >
      <img
        className={"img-fluid py-1 d-block mx-auto GalleryImage-image"}
        src={image}
        key={image}
        onLoad={onLoad}
        alt={title}
      />
      <div
        className={"GalleryImage-details flex-column justify-content-end p-2"}
      >
        <div>
          <strong>{userHandle || author}</strong>
        </div>
        <div>
          <em>{new Date(dateTaken).toLocaleDateString()}</em>
        </div>
        {/*Tags can get very long and grow higher than the image, so truncate them to on line*/}
        <div className={"text-truncate"}>{tags}</div>
        <a
          title={"View Full Size Image"}
          rel="noreferrer noopener"
          target="_blank"
          href={link}
        >
          View Full Size Image
        </a>
      </div>
    </div>
  );
};

export default GalleryImage;
