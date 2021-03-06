import * as React from 'react';

import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';

import * as d3 from 'd3';

import styles from './chart-base-component.scss';
import { ChartProps } from 'src/models/chart-props.model';


export class ChartBaseComponent<Props extends ChartProps = ChartProps> extends React.Component<Props> {

    protected onUnmount$: Subject<void> = new Subject();

    protected ref: React.RefObject<HTMLDivElement>;
    protected svgRef: React.RefObject<SVGSVGElement>;

    public svg: d3.Selection<SVGSVGElement, unknown, null, undefined>

    public readonly chartContainerClassName: string;
    public readonly chartClassName: string;

    public readonly margins = {
        top: 12,
        right: 84,
        bottom: 36,
        left: 24,
    };

    public get width(): number {
        if (this.ref && this.ref.current) {
            return this.ref.current.offsetWidth - this.margins.left - this.margins.right;
        }
        return 0;
    }

    public get height(): number {
        if (this.ref && this.ref.current) {
            return this.ref.current.offsetHeight - this.margins.top - this.margins.bottom;
        }
        return 0;
    }

    constructor(props: Props) {
        super(props);
        // console.log('ChartBaseComponent', props);
        this.ref = React.createRef();
        this.svgRef = React.createRef();

    }

    public componentDidMount(): void {
        // this.svg = d3.select(this.svgRef.current);
        // this._drawChart();
        const onResize = () => {
            this._drawChart();
        }
        window.addEventListener('resize', onResize);
        this.onUnmount$.pipe(first()).subscribe(() => window.removeEventListener('resize', onResize));
    }

    public componentDidUpdate(): void {
        if (!this.svgRef.current && this.props.chartData && this.props.chartData.length > 0) {
            this.forceUpdate();
        }
        else {
            this.svg = d3.select(this.svgRef.current);
            this._drawChart();
        }
    }

    public componentWillUnmount(): void {
        this.onUnmount$.next();
    }

    private renderLabel(): JSX.Element {
        if (this.props.label) {
            return (
                <div className={styles['chart-header']}>
                    <span className={styles['chart-label']}>
                        { this.props.label }
                    </span>
                </div>
            );
        }
        return null;
    }

    private renderStatus(): JSX.Element {
        // console.log('renderStatus');
        if (this.props.isFetching) {
            return (
                <span className={ `${ styles['status'] } ${ styles['loading'] }` }>Loading...</span>
            );
        }
        if (this.props.fetchFailed) {
            return (
                <span className={ `${ styles['status'] } ${ styles['error'] }` }>Error...</span>
            );
        }
        if (!this.props.chartData || this.props.chartData.length === 0) {
            return (
                <span className={ `${ styles['status'] } ${ styles['no-data'] }` }>No data</span>
            );
        }
        return (
            <div className={ styles['chart-container'] } ref={ this.ref }>
                <svg ref={ this.svgRef } className={ `${ styles['chart'] } ${ this.chartClassName }` }/>
            </div>
        )
        // return null;
    }

    public render(): JSX.Element {
        return (
            <div className={ `${ styles['container1'] } ${ this.chartContainerClassName }` }>
                { this.renderLabel() }
                <div className={ styles['container2'] }>
                    { this.renderStatus() }
                </div>
                {/* <div className={ styles['chart-container'] } ref={ this.ref }>
                    <svg ref={ this.svgRef } className={ `${ styles['chart'] } ${ this.chartClassName }` }/>
                </div> */}
            </div>
        );
    }

    protected drawChart(): void {
        throw new Error('drawChart not implemented');
    }

    private _drawChart(): void {
        // console.warn('_drawChart');
        this.clearSvg();
        this.setSvgMargins();
        this.drawChart();
    }

    protected clearSvg(): void {
        // console.log('clearSvg');
        this.svg.selectAll('*').remove();
    }

    protected setSvgMargins(): void {
        // console.log('setSvgMargins');
        const width = this.width;
        const height = this.height;
        this.svg.attr('width', width + this.margins.left + this.margins.right);
        this.svg.attr('height', height + this.margins.top + this.margins.bottom);
        this.svg.attr('viewBox', '0 0 ' + (width + this.margins.left + this.margins.right) + ' ' + (height + this.margins.top + this.margins.bottom));
        this.svg.attr('preserveAspectRatio', 'xMidYMid');
    }

}

