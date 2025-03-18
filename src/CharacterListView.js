import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {BaseURL, getApiResponse} from './Api';

const CharacterListView = () => {
  const [characterList, setCharacterList] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    search: '',
    currentPage: 1,
  });
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    getSearch();
  }, [filterOptions]);

  /**
   * Fetches character data from the API based on search query and pagination
   */
  const getSearch = async () => {
    try {
      setLoading(true);
      let response = await getApiResponse(
        `${BaseURL}?search=${filterOptions.search}&page=${filterOptions.currentPage}`,
      );
      if (response.results && response.results.length > 0) {
        if (characterList.length === 0) {
          setCharacterList(response.results);
        } else {
          setCharacterList([...characterList, ...response.results]);
        }
      } else {
        if (filterOptions.search.trim() !== '') {
          setCharacterList([]);
        }
      }
      if (response.count) {
        setTotalCount(response.count);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  /**
   * Removes duplicate characters based on the combination of name and eye color
   * @param {Array} arr - The list of characters
   * @returns {Array} - A list without duplicates
   */
  const removeDuplicates = arr => {
    const seen = new Set();
    return arr.filter(item => {
      const key = `${item.name}-${item.eye_color}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  };

  /**
   * Sorts characters based on eye color and other properties:
   * - Blue-eyed characters are sorted alphabetically by name
   * - Other characters are sorted by creation date (oldest first)
   */
  const sortedCharacter = useMemo(() => {
    let tempList = removeDuplicates(characterList);
    const blueEyeArr = tempList.filter(
      item => item.eye_color?.toLowerCase() === 'blue',
    );
    const otherArr = tempList.filter(
      item => item.eye_color?.toLowerCase() !== 'blue',
    );
    blueEyeArr.sort((a, b) => a.name.localeCompare(b.name));
    otherArr.sort((a, b) => {
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      return dateA - dateB;
    });
    return [...blueEyeArr, ...otherArr];
  }, [characterList]);

  /**
   * Formats a date string into "MM-DD-YYYY" format
   * @param {string} dateString - Date string from API
   * @returns {string} - Formatted date string
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  /**
   * Renders a single character item in the list
   * @param {Object} item - Character data
   */
  const renderItem = ({item}) => {
    return (
      <View style={styles.cellView}>
        <Text style={styles.cellName}>
          Name: <Text style={styles.cellValue}>{item.name}</Text>
        </Text>
        <Text style={styles.cellName}>
          Eye Color: <Text style={styles.cellValue}>{item.eye_color}</Text>
        </Text>
        <Text style={styles.cellName}>
          Gender: <Text style={styles.cellValue}>{item.gender}</Text>
        </Text>
        <Text style={styles.cellName}>
          Date: <Text style={styles.cellValue}>{formatDate(item.created)}</Text>
        </Text>
        <View style={styles.cellLine(item.eye_color)} />
      </View>
    );
  };

  /**
   * Loads more characters when the user scrolls to the bottom
   */
  const loadMore = () => {
    if (loading) {
      return;
    }
    if (totalCount > characterList.length && characterList.length > 0) {
      let filterOpt = {...filterOptions};
      filterOpt.currentPage = filterOpt.currentPage + 1;
      setFilterOptions(filterOpt);
    }
  };

  /**
   * Handles search input changes and resets the list
   * @param {string} text - Search input value
   */
  const onSearchText = text => {
    let filterOpt = {...filterOptions};
    filterOpt.search = text;
    filterOpt.currentPage = 1;
    setCharacterList([]);
    setFilterOptions(filterOpt);
  };

  /**
   * Clears the search input and resets the list
   */
  const onClearSearch = () => {
    let filterOpt = {...filterOptions};
    filterOpt.search = '';
    filterOpt.currentPage = 1;
    setCharacterList([]);
    setFilterOptions(filterOpt);
    Keyboard.dismiss();
  };

  return (
    <>
      {/* Search Bar */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          value={filterOptions.search}
          onChangeText={onSearchText}
          placeholder="Search ..."
        />
        <TouchableOpacity>
          <Text style={styles.clearText} onPress={onClearSearch}>
            Clear
          </Text>
        </TouchableOpacity>
      </View>

      {/* Character List */}
      <View style={styles.flatListMainView}>
        <FlatList
          style={{flex: 1}}
          data={sortedCharacter}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}`}
          onEndReached={loadMore}
          scrollEnabled={true}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View />
            )
          }
          ListEmptyComponent={() => (
            <>
              {loading ? (
                <View />
              ) : (
                <View style={styles.noDataFoundView}>
                  <Text style={styles.noDataFoundText}>No data found.</Text>
                </View>
              )}
            </>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 20,
    paddingHorizontal: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#525252',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  searchInput: {flex: 1, color: 'black', fontSize: 17},
  clearText: {color: 'blue', fontSize: 17},
  flatListMainView: {flex: 1, marginTop: 10},
  noDataFoundView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataFoundText: {fontSize: 17, marginTop: 20},
  cellView: {marginHorizontal: 20},
  cellName: {
    fontSize: 17,
    color: 'black',
    marginVertical: 10,
    flex: 1,
    fontWeight: 'bold',
  },
  cellValue: {fontWeight: 'normal'},
  cellLine: eye_color => ({
    height: 1,
    backgroundColor: eye_color?.toLowerCase() === 'blue' ? 'blue' : 'black',
    marginTop: 5,
  }),
});

export default CharacterListView;
