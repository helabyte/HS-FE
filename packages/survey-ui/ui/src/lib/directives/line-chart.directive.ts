// src/app/directives/line-chart.directive.ts
import { Directive, effect, ElementRef, input, OnDestroy } from '@angular/core';

import * as d3 from 'd3';

import { ChartDataType } from '@hela/survey-ui/utils';

@Directive({
  selector: '[hlsLineChart]',
  standalone: true,
})
export class LineChartDirective implements OnDestroy {
  chartData = input.required<ChartDataType>();
  width = input(300);
  height = input(300);
  private svg: any;

  constructor(private el: ElementRef) {
    effect(() => {
      this.renderChart();
    });
  }

  ngOnDestroy(): void {
    this.removeChart();
  }

  private removeChart() {
    if (this.svg) {
      this.svg.selectAll('*').remove();
      this.svg = null;
    }
  }
  private renderChart(): void {
    this.removeChart();
    const chartDataValue = this.chartData();

    if (
      !chartDataValue ||
      !chartDataValue.options ||
      chartDataValue.options.length === 0
    ) {
      return;
    }

    const data = chartDataValue.options;
    const validData = data.filter(
      (d) => typeof d.votes === 'number' && d.votes >= 0
    );
    if (validData.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 40 }; // Increased margins
    const innerWidth = this.width() - margin.left - margin.right;
    const innerHeight = this.height() - margin.top - margin.bottom;

    this.svg = d3
      .select(this.el.nativeElement)
      .attr('width', this.width())
      .attr('height', this.height())
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`); // Translate by margin

    const x = d3
      .scaleBand()
      .range([0, innerWidth]) // Use innerWidth
      .domain(data.map((d) => d.label))
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .range([innerHeight, 0]) // Use innerHeight
      .domain([0, d3.max(data, (d) => d.votes) as number]);

    // X Axis
    this.svg
      .append('g')
      .attr('transform', `translate(0, ${innerHeight})`) // Position at bottom of inner area
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)')
      .text((d: string) => this.truncateText(d, x.bandwidth())) // Truncate labels
      .attr('class', 'text-gray-800');

    // Y Axis
    this.svg.append('g').call(d3.axisLeft(y)).attr('class', 'text-gray-800');

    const line = d3
      .line<any>()
      .x((d: any) => x(d.label)! + x.bandwidth() / 2)
      .y((d: any) => y(d.votes))
      .curve(d3.curveMonotoneX);

    this.svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    this.svg
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot cursor-pointer')
      .attr('cx', (d: any) => x(d.label)! + x.bandwidth() / 2)
      .attr('cy', (d: any) => y(d.votes))
      .attr('r', 5)
      .attr('fill', (_d: any, i: number) => d3.schemeCategory10[i % 10])
      .append('title')
      .text((d: any) => `${d.label}: ${d.votes} votes`);
  }

  // Helper function to truncate text, now considering available width
  private truncateText(text: string, availableWidth: number): string {
    const charWidth = 8; // Approximate char width, adjust as needed
    const maxChars = Math.floor(availableWidth / charWidth);

    if (text.length > maxChars) {
      return text.substring(0, maxChars - 3) + '...';
    }
    return text;
  }
}
