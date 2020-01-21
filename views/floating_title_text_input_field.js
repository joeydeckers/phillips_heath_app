import React, { Component } from 'react';
import { View, Animated, StyleSheet, Text, TextInput } from 'react-native';
import { string, func } from 'prop-types';

export class FloatingTitleTextInputField extends Component {
  static propTypes = {
    attrName: string.isRequired,
    title: string.isRequired,
    value: string.isRequired,
    updateMasterState: func.isRequired,
  }

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: false,
    }
  }

  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({ isFieldActive: true });
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
      }).start();
    }
  }

  _handleBlur = () => {
    if (this.state.isFieldActive && !this.props.value) {
      this.setState({ isFieldActive: false });
      Animated.timing(this.position, {
        toValue: 0,
        duration: 150,
      }).start();
    }
  }

  _onChangeText = (updatedValue) => {
    const { attrName, updateMasterState } = this.props; 
    updateMasterState(attrName, updatedValue);
  }

  _returnAnimatedTitleStyles = () => {
    const { isFieldActive } = this.state;
    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 0],
      }),
      fontSize: isFieldActive ? 11.5 : 15,
      color: isFieldActive ? 'black' : 'black',
    }
  }

  render() {
    if(!this.state.value == ''){
      this.setState({ isFieldActive: true });
    }
    return (
      <View style = 
      {[Styles.container, { height: this.props.height}]}>
        <Animated.Text
          style = {[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
        >
          {this.props.title}
        </Animated.Text>
        <TextInput
          value = {this.props.value}
          editable= {this.props.disabled} 
          selectTextOnFocus= {this.props.disabled}
          style = {Styles.textInput}
          multiline= {this.props.multi}
          numberOfLines={this.props.multicount}
          underlineColorAndroid = 'transparent'
          onFocus = {this._handleFocus}
          maxLength = {this.props.length}
          onBlur = {this._handleBlur}
          onChangeText = {this._onChangeText}
        />
        <Text style = {Styles.error}>{this.props.error}</Text>
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#707070',
    marginBottom: 10,
    borderBottomWidth: 0.8,
    marginVertical: 4
  },
  textInput: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: 'bold',
    color: 'black',
  },
  error: {
    fontSize: 10,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'red',
  },
  titleStyles: {
    position: 'absolute',
    left: 3,
    left: 4,
    fontWeight: 'bold',
  }
})