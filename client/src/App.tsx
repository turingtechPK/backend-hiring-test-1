import React from 'react';
import { Provider } from 'react-redux';
import { useCallsControllerFindAllQuery } from './store/reducers/generated';
import { store } from './store/store';
import './app.css';

function TwilioData() {
  const { data: list = [], isLoading } = useCallsControllerFindAllQuery();
  console.log(list, isLoading);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>CallSid</th>
            <th>CallStatus</th>
            <th>From</th>
            <th>Duration</th>
            <th>Recording</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading ? (
            list.map((item) => (
              <tr key={item.CallSid}>
                <td>{item.CallSid}</td>
                <td>{item.CallStatus}</td>
                <td>{item.From}</td>
                <td>{item.Duration}</td>
                <td>
                  {item.RecordingUrl && (
                    <audio controls>
                      <source src={item.RecordingUrl} />
                    </audio>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <h3>Loading</h3>
          )}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <TwilioData />
    </Provider>
  );
}
export default App;
