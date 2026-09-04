declare global {
    interface Window {
        electronAPI: {
            platform: string;
            getJavaVersion(): Promise<string>;
        };
    }
}