import React from 'react';
import { StyleSheet, Text, View, TextInput, SectionList, StatusBar } from 'react-native';

export default class App extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			text: 'Enter text',
            sections: []
		};
	}
    
    render() {
        
        
        return (
            <View style={styles.container}>
                <SectionList
                    stickySectionHeadersEnabled={true}
                    keyExtractor={(item, index) => index}
                    renderSectionHeader={({section}) =><Text style={{backgroundColor: "#cc3478"}}>{section.title}</Text>}
                    sections={this.state.sections}
                    renderItem={({item}) =>
                        <View style={styles.listItems}>
                            <Text>{item.description}</Text>
                            <Text>{item.descriptionFr}</Text>
                        </View>
                    }
                />
            </View>
        );
    }
    
    componentDidMount(){
        return fetch('http://traffic.ottawa.ca/map/camera_list')
            .then((response) => response.json())
            .then((responseJson) => {
                var data = {};
                responseJson.map((x) => {
                    if(!data[x.description.replace(/\W/g, '')[0]]){
                        data[x.description.replace(/\W/g, '')[0]] = [];
                    }
                    data[x.description.replace(/\W/g, '')[0]].push(x);
                });
                
                var keys = Object.keys(data).sort();
                var sectionData = [];
                
                for (let key of keys){
                    var x = {};
                    x.data = data[key];
                    x.title = key;
                    sectionData.push(x);
                }
                
                this.setState({
                  sections: sectionData
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
  },
    listItems: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20
  },
});
