// Global test setup
Object.defineProperty(window, 'open', {
  writable: true,
  value: vi.fn(),
});