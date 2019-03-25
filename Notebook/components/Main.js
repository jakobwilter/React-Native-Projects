import React from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, ScrollView,
  TouchableOpacity } from 'react-native';
import { AsyncStorage } from "react-native"
import Note from './Note';

export default class Main extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          noteArray: [],
          noteText: '',
      };
  }
  render() {
      let notes = this.state.noteArray.map((val, key)=>{
          return <Note key={key} keyval={key} val={val}
                  deleteMethod={()=>this.deleteNote(key)}/>
      });
      return (
          <View style={styles.container}>

          <TouchableOpacity onPress={this.saveData} style = {styles.saveTheData}>
            <Text>Click me to save data</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.displayData} style = {styles.displayTheData}>
            <Text>Click me to display data</Text>
          </TouchableOpacity>


              <View style={styles.header}>
                  <Text style={styles.headerText}>TODO LIST</Text>
              </View>
              <ScrollView style={styles.scrollContainer}>
                  {notes}
              </ScrollView>
              <View style={styles.footer}>
                  <TextInput
                      style={styles.textInput}
                      placeholder='Add a Todo'
                      onChangeText={(noteText)=> this.setState({noteText})}
                      value={this.state.noteText}
                      placeholderTextColor='white'
                      underlineColorAndroid='transparent'>
                  </TextInput>
              </View>
              <TouchableOpacity onPress={ this.addNote.bind(this) } style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
          </View>
      );
  }

  componentDidMount(){
    AsyncStorage.getItem('note').then((obj) => {
      this.setState({'note': obj});
    }).done();
  }

  saveData() {
    let obj = {notes: this.getState.noteArray}
    AsyncStorage.setItem('note', JSON.stringify(obj));
  }

  addNote(){
      if(this.state.noteText){
          var d = new Date();
          this.state.noteArray.push({
              'date':(d.getMonth() + 1) +
              "/" + d.getDate() +
              "/" + d.getFullYear(),
              'note': this.state.noteText
          });
          this.setState({ noteArray: this.state.noteArray });
          this.saveData({ noteArray: this.state.noteArray });
          this.setState({ noteText:'' });
      }
  }
  deleteNote(key){
      this.state.noteArray.splice(key, 1);
      this.setState({noteArray: this.state.noteArray});
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
      backgroundColor: '#E91E63',
      alignItems: 'center',
      justifyContent:'center',
      borderBottomWidth: 10,
      borderBottomColor: '#ddd'
  },
  headerText: {
      color: 'white',
      fontSize: 18,
      padding: 26
  },
  scrollContainer: {
      flex: 1,
      marginBottom: 100
  },
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10
  },
  textInput: {
      alignSelf: 'stretch',
      color: '#fff',
      padding: 40,
      backgroundColor: '#252525',
      borderTopWidth:2,
      borderTopColor: '#ededed'
  },
  addButton: {
      position: 'absolute',
      zIndex: 11,
      right: 20,
      bottom: 90,
      backgroundColor: '#E91E63',
      width: 70,
      height: 70,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8
  },
  addButtonText: {
      color: '#fff',
      fontSize: 24
  },

  saveTheData: {
      position: 'absolute',
      bottom: 120,
      left: 0,
      right: 0,
      zIndex: 20
  },
  displayTheData: {
      position: 'absolute',
      bottom: 100,
      left: 0,
      right: 0,
      zIndex: 20
  },

});
