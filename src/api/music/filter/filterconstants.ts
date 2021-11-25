export default class FilterConstants {
    volume: number;
    equalizer: any[] | null;
    karaoke: unknown | null;
    channelMix: unknown | null;
    timescale: unknown | null;
    tremolo: unknown | null;
    vibrato: unknown | null;
    rotation: unknown | null;
    distortion: unknown | null;
    lowpass: unknown | null;

    constructor(filterOptions?: any) {
        this.volume = 1.0;
        this.equalizer = filterOptions?.equalizer ?? [];
        this.karaoke = filterOptions?.karaoke ?? null;
        this.channelMix = filterOptions?.channelMix ?? null;
        this.timescale = filterOptions?.timescale ?? null;
        this.tremolo = filterOptions?.tremolo ?? null;
        this.vibrato = filterOptions?.vibrato ?? null;
        this.rotation = filterOptions?.rotation ?? null;
        this.distortion = filterOptions?.distortion ?? null;
        this.lowpass = filterOptions?.lowpass ?? null;
    }
}