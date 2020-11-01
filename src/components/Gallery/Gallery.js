import * as React from "react";
import "./Gallery.css";
import GalleryColumn from "./GalleryColumn/GalleryColumn";
import useIsMobile from "../utils/useIsMobile";

/**
 * Returns number of columns which should show based on screen size
 */
const useResponsiveColumnCount = () => {
  const isMobile = useIsMobile();
  const [numberOfColumns, setNumberOfColumns] = React.useState(
    isMobile ? 2 : 3
  );
  React.useEffect(() => {
    if (isMobile) {
      setNumberOfColumns(2);
    } else {
      setNumberOfColumns(3);
    }
  }, [isMobile]);
  return numberOfColumns;
};

/**
 * Creates an object to hold image arrays for each column
 * @param {Object[]} initWithItems - Array of flickr image objects
 * @param {number} numberOfColumns
 */
const getInitialColumns = (initWithItems, numberOfColumns) => {
  // Create a record of key => item array for each column
  const initialColumns = [...Array(numberOfColumns)].reduce(
    (accumulator, currentValue, index) => {
      return {
        ...accumulator,
        [index]: initWithItems[index] ? [initWithItems[index]] : [],
      };
    },
    {}
  );
  const remainingQueue = [...initWithItems.slice(numberOfColumns)]; // Remove as many items from the queue as were added to the columns in initialisation
  return [initialColumns, remainingQueue];
};

/**
 * Puts items from the feed into columns
 * Returns a function to add another image into a column, whether the queue is empty/finished, and the image columns
 * @param {Object[]} itemsFromParent - Array of flickr image objects
 * @param {number} numberOfColumns
 */
const useColumnImages = (itemsFromParent, numberOfColumns) => {
  // Remaining queue holds all images not yet in columns
  const [remainingQueue, setRemainingQueue] = React.useState(null);
  const [itemColumns, setItemColumns] = React.useState(null);

  // If parent items update or number of columns update, reset remainingQueue and columnItems
  React.useEffect(() => {
    const [initialItemColumns, initialRemainingQueue] = getInitialColumns(
      itemsFromParent,
      numberOfColumns
    );
    setItemColumns(initialItemColumns);
    setRemainingQueue(initialRemainingQueue);
  }, [itemsFromParent, numberOfColumns]);

  const requestImageForColumn = React.useCallback(
    (columnKey) => {
      if (remainingQueue.length) {
        setItemColumns({
          ...itemColumns,
          [columnKey]: [...itemColumns[columnKey], remainingQueue[0]],
        });
        // Remove the element just added
        setRemainingQueue([...remainingQueue.slice(1)]);
      }
    },
    [itemColumns, remainingQueue]
  );

  return {
    requestImageForColumn,
    endOfResults: remainingQueue !== null && remainingQueue.length === 0,
    itemColumns,
  };
};

/**
 * Component to render image gallery according to query results
 * @param {Object[]} props.items - Array of flickr image objects
 */

// Use React.memo to separate rendering Gallery when input is changed
const Gallery = React.memo((props) => {
  const { items: itemsFromParent } = props;
  const numberOfColumns = useResponsiveColumnCount();
  const { requestImageForColumn, endOfResults, itemColumns } = useColumnImages(
    itemsFromParent,
    numberOfColumns
  );

  return (
    <div className={"Gallery-container row no-gutters"}>
      {/*Columns are created and images are populated down each of them*/}
      {/*This differs from a simpler method of adding images by row*/}
      {/*The issue with the simpler method is that it leads to images of differing heights sitting in the same row*/}
      {/*Which does not take advantage of the space well and is not as visually appealing*/}
      {itemColumns !== null &&
        Object.entries(itemColumns).map(([key, items]) => {
          return (
            <GalleryColumn
              key={key}
              columnKey={key}
              numberOfColumns={numberOfColumns}
              requestImageForColumn={requestImageForColumn}
              items={items}
            />
          );
        })}
      {endOfResults && (
        <div className={"mx-auto my-5"}>
          <strong>End of Results</strong>
        </div>
      )}
      {!endOfResults && (
        // This div makes it possible to scroll below the results which is helpful so the scroll momentum doesn't
        // Stop, especially on mobile
        <div className={"py-3"}>&nbsp;</div>
      )}
    </div>
  );
});

Gallery.displayName = "Gallery";
export default Gallery;
