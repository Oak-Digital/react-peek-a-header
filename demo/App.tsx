import React from 'react';
import { PeekAHeaderComponent, TransitionClassStrategy, PeekAHeaderProvider, PeekAHeaderConsumer } from '../src/main';

const App = () => {
    return (
        <PeekAHeaderProvider>
            <PeekAHeaderConsumer>
                {({ hide, partialHide, show }) => (
                    <div className="page">
                        <PeekAHeaderComponent
                            className="sticky top-0"
                            autoSnap
                            transitionStrategy={
                                new TransitionClassStrategy({
                                    hideClass: 'transition-all',
                                    showClass: 'transition-all',
                                })
                            }
                        >
                            <div className="flex justify-between items-center">
                                <div>Peek a header</div>
                                <div>
                                    <button onClick={() => partialHide()}>Hide</button>
                                </div>
                            </div>
                        </PeekAHeaderComponent>
                    </div>
                )}
            </PeekAHeaderConsumer>
        </PeekAHeaderProvider>
    );
};

export default App;
