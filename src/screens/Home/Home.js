import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import {moderateScale, moderateScaleVertical, width, height, textScale} from '../../styles/responsiveSize';
import colors from '../../styles/colors';

// create a component
const Home = () => {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [currentId, setCurrentId] = useState('');

  const getText = enteredText => {
    setEnteredGoal(enteredText);
  };

  const addText = () => {
    setCourseGoals(currentGoal => [
      ...currentGoal,
      {id: Math.random().toString(), value: enteredGoal},
    ]);
    setEnteredGoal('')
  };


  const deleteItem = id => {
    console.log(id);
    const newList = courseGoals.filter(list => list.id !== id);
    console.log(newList);
    setCourseGoals(newList);
  };

  const renderUsers = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: moderateScale(20),
          marginBottom: moderateScale(10),
        }}>
        <Text style={{fontSize: textScale(14)}}>{item.value}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              justifyContent: 'center',
              paddingHorizontal: moderateScale(8),
              borderRadius: moderateScale(4),
              paddingVertical: moderateScale(2),
              marginRight: moderateScale(6),
            }}
            onPress={() => {
              setModalVisible(true);
              setEditedText(item.value);
              setCurrentId(item.id);
              //  onEdit(item.id,item.value);
            }}>
            <Text style={{color: 'white'}}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              justifyContent: 'center',
              paddingHorizontal: moderateScale(8),
              borderRadius: moderateScale(4),
              paddingVertical: moderateScale(2),
              marginRight: moderateScale(6),
            }}
            onPress={() => deleteItem(item.id)}>
            <Text style={{color: 'white'}}>Delete</Text>
          </TouchableOpacity>
        </View>

        {/* modal Screen     */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* <Text>{item?.value} hello </Text> */}
              <TextInput
                onChangeText={text => setEditedText(text)}
                value={editedText}
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(false), onSubmitEdit(currentId, editedText);
                }}>
                <Text style={styles.textStyle}> Submit </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

    const onSubmitEdit = (itemid, itemValue) => {
      courseGoals.map(list => {
        if (list.id == itemid) {
          list.value = editedText;
        }
        return courseGoals;
      });
    };

  const onDelete = id => {
    console.log('before Filter', courseGoals);
    const newList = courseGoals.filter(list => list.id !== id);
    setCourseGoals(newList);
    alert(id);
    console.log('afterFilter', newList);
  };

   

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: colors.red,
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 30,
            fontWeight: '600',
            color: '#fff',
          }}>
          To Do List
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 10,
          width: '100%',
          flexDirection: 'row',
        }}>
        <TextInput
          style={{
            borderColor: 'black',
            borderWidth: 1,
            width: '70%',
            paddingLeft: 10,
          }}
          placeholder="enter the list Item"
          onChangeText={getText}
          value={enteredGoal}
        />

        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            width: '20%',
            marginLeft: moderateScale(10),
          }}
          onPress={addText}>
          <Text style={{color: 'white', fontSize: 15, padding: 5}}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10, marginHorizontal: 10, width: '100%'}}>
        <FlatList data={courseGoals} renderItem={renderUsers} />
      </View>

    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  // modal styling
  centeredView: {
    backgroundColor:'rgba(0,0,0,0.4)',
    flex: 1,
    // justifyContent: 'center',
    // alignItems:'flex-end',
    justifyContent:'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 35,
    // alignSelf:'flex-end',
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

});

//make this component available to the app
export default Home;
