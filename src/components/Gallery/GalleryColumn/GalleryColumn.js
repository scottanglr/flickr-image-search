import useIntersectionObserver from "../../utils/useIntersectionObserver";
import * as React from "react";
import useCallbackWhen from "../../utils/useCallbackWhen";
import GalleryImage from "../GalleryImage/GalleryImage";

/**
 * Component to render a single column in Gallery
 * @param {Object[]} props.items - Array of flickr image objects
 * @param {(string) => void} props.requestImageForColumn - Send the key of the column to request another image
 * @param {number} props.numberOfColumns - The number of columns which are displayed
 * @param {string} props.columnKey - String used to request another image
 */

// Use React.memo to separate the rendering of GalleryColumns
const GalleryColumn = React.memo((props) => {
  const { items, columnKey, requestImageForColumn, numberOfColumns } = props;

  const intersectionObserverSettings = React.useMemo(() => {
    return {
      rootMargin: "0%", // Load when images appear into view
    };
  }, []);
  const [
    endOfColumnObservableRef,
    isEndOfColumnObservable,
  ] = useIntersectionObserver(intersectionObserverSettings);

  const onEndOfColumnIsObservedCallback = React.useCallback(() => {
    requestImageForColumn(columnKey);
  }, [requestImageForColumn, columnKey]);

  useCallbackWhen(
    false,
    true,
    isEndOfColumnObservable,
    onEndOfColumnIsObservedCallback
  );

  const onImageInColumnLoadedCallback = React.useCallback(() => {
    if (isEndOfColumnObservable) {
      onEndOfColumnIsObservedCallback();
    }
  }, [isEndOfColumnObservable, onEndOfColumnIsObservedCallback]);

  const percentWidth = `${100 / numberOfColumns}%`;

  return (
    <div
      className={"col px-1"}
      style={{
        flexGrow: "0",
        flexShrink: "0",
        flexBasis: percentWidth,
        maxWidth: percentWidth,
      }}
    >
      {items.map((item) => {
        const {
          media,
          author,
          link,
          tags,
          date_taken: dateTaken,
          title,
        } = item;
        const image = media.m;
        return (
          <GalleryImage
            onLoad={onImageInColumnLoadedCallback}
            key={image}
            image={image}
            author={author}
            tags={tags}
            dateTaken={dateTaken}
            title={title}
            link={link}
          />
        );
      })}
      <div ref={endOfColumnObservableRef} />
    </div>
  );
});
GalleryColumn.displayName = "GalleryColumn";

export default GalleryColumn;
