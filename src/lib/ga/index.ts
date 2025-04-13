class GA {
  event({ action, ...params }: GTagEvent) {
    window.gtag('event', action, params);
  }

  customEventParams(config: any) {
    window.gtag('set', {
      ...config,
    });
  }
}

const ga = new GA();

export default ga;
