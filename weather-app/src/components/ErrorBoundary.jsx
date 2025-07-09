import React from 'react'

class ErrorBoundary extends React.Component {
    state = { hasError: false };
    
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    
    render() {
        if (this.state.hasError) {
            return <div>Bir hata oluştu. Lütfen yeniden deneyin.</div>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary