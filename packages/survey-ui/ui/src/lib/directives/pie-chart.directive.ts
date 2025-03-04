import { Directive, effect, ElementRef, input, OnDestroy } from '@angular/core';

import * as d3 from 'd3';

import { SafeAnyType } from '@hela/survey-shared';
import { ChartDataType } from '@hela/survey-ui/utils';

@Directive({
  selector: '[hlsPieChart]',
  standalone: true,
})
export class PieChartDirective implements OnDestroy {
  chartData = input.required<ChartDataType>();
  width = input(300);
  height = input(300);
  private svg: SafeAnyType;

  constructor(private el: ElementRef) {
    effect(() => {
      this.renderChart(); // Call renderChart whenever inputs change
    });
  }

  ngOnDestroy(): void {
    this.removeChart();
  }

  private removeChart() {
    if (this.svg) {
      this.svg.selectAll('*').remove();
      this.svg = null; // Important to clear the reference
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
      (d: SafeAnyType) => typeof d.votes === 'number' && d.votes >= 0
    );
    if (validData.length === 0) return;

    const margin = { top: 20, right: 20, bottom: 20, left: 20 }; // Add margins
    const innerWidth = this.width() - margin.left - margin.right;
    const innerHeight = this.height() - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;

    this.svg = d3
      .select(this.el.nativeElement)
      .attr('width', this.width())
      .attr('height', this.height())
      .append('g')
      .attr(
        'transform',
        `translate(${this.width() / 2}, ${this.height() / 2})`
      ); // Center in total area

    const pie = d3.pie<SafeAnyType>().value((d: SafeAnyType) => d.votes);
    const arc = d3.arc().outerRadius(radius).innerRadius(0); // Use the calculated radius
    const labelArc = d3
      .arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.8); // Adjust label position

    const arcs = this.svg
      .selectAll('.arc')
      .data(pie(validData))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (_d: SafeAnyType, i: number) => d3.schemeCategory10[i % 10])
      .attr('class', 'cursor-pointer')
      .append('title')
      .text((d: SafeAnyType) => `${d.data.label}: ${d.data.votes} votes`);

    // Add text labels, ensuring they fit within the bounds
    arcs
      .append('text')
      .attr('transform', (d: SafeAnyType) => `translate(${labelArc.centroid(d)})`)
      .attr('dy', '.35em')
      .text((d: SafeAnyType) => this.truncateText(d.data.label, radius * 0.7)) // Truncate long labels
      .style('text-anchor', 'middle')
      .attr('class', 'text-gray-800');
  }

  // Helper function to truncate text
  private truncateText(text: string, maxLength: number): string {
    const textLength = text.length;
    const charWidth = 8; // Approximate char width

    if (textLength * charWidth > 2 * maxLength) {
      const truncated =
        text.substring(0, Math.floor((2 * maxLength) / charWidth) - 3) + '...';
      return truncated;
    }
    return text;
  }
}
