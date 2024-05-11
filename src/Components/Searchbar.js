import React, { useContext } from "react";
import eDairyContext from "../context/eDairyContext";

export const Searchbar = () => {
  const context = useContext(eDairyContext);
  const {
    user,
    classes,
    setSelectedClass,
    setSubjects,
    childrens,
    setSelectedChildren,
  } = context;
  const handleInputChange = (event) => {
    if (event.target.value && event.target.value !== "Choose a Class") {
      const selectedItem = classes?.find(
        (item) => item?.name === event.target.value
      );
      setSelectedClass(selectedItem || {});
      setSubjects(selectedItem?.subject || []);
    } else {
      setSelectedClass({});
      setSubjects([]);
    }
  };

  const handleChangeChildren = (event) => {
    if (event.target.value) {
      const selectedItem = childrens?.find(
        (item) => item?.id === event.target.value
      );
      setSubjects(selectedItem?.class?.subject || []);
      setSelectedClass(selectedItem?.class || {});
      setSelectedChildren(selectedItem || {});
    } else {
      setSelectedChildren({});
    }
  };

  return (
    <div class="w-1/3 mx-auto">
      {user.role == "parent" ? (
        <select
          onChange={handleChangeChildren}
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Select a children</option>

          {childrens &&
            childrens.map((item) => {
              return <option value={item.id}>{item.name}</option>;
            })}
        </select>
      ) : (
        <select
          onChange={handleInputChange}
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose a Class</option>
          {classes &&
            classes.map((classItem) => (
              <option value={classItem.name}>{classItem.name}</option>
            ))}
        </select>
      )}
    </div>
  );
};
