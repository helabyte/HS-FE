import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import * as d3 from 'd3';

import { QuestionType, SafeAnyType } from '@hela/survey-ui/utils';

import { PollComponent } from '../poll/poll.component';

@Component({
  selector: 'hls-chart-viewer',
  standalone: true,
  imports: [MatCardModule, MatIconModule, NgIf, MatButtonModule, PollComponent],
  templateUrl: './chart-viewer.component.html',
  styleUrls: ['./chart-viewer.component.scss'],
})
export class ChartViewerComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  @Input() chartData: QuestionType;
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  private svg: SafeAnyType;
  private chartRendered = false;

  ngAfterViewInit(): void {
    if (this.chartData && !this.chartRendered) {
      this.renderChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && this.chartData) {
      if (this.chartContainer) {
        this.renderChart(); // Call renderChart when chartData changes
      }
    }
  }

  ngOnDestroy(): void {
    if (this.svg) {
      this.svg.selectAll('*').remove(); // Clean up D3 elements
    }
  }

  private renderChart(): void {
    if (this.svg) {
      this.svg.selectAll('*').remove();
    }
    if (
      !this.chartData ||
      !this.chartData.options ||
      this.chartData.options.length === 0
    ) {
      return;
    }

    console.log('this.chartData', this.chartData);

    // Prepare data for D3, now using 'votes' instead of 'value'
    const data = this.chartData.options.map((option: SafeAnyType) => ({
      label: option.label,
      votes: option.votes, // Use the 'votes' property
    }));

    // Filter for valid vote counts (non-negative numbers)
    const validData = data.filter(
      (d: SafeAnyType) => typeof d.votes === 'number' && d.votes >= 0
    );
    if (validData.length === 0) {
      return;
    }

    const width = 300;
    const height = 300;
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };

    this.svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    switch (this.chartData.chartType) {
      case 'pie':
        this.renderPieChart(validData, width, height, margin);
        break;
      case 'bar':
        this.renderBarChart(validData, width, height, margin);
        break;
      case 'line':
        this.renderLineChart(validData, width, height, margin);
        break;
      default:
        console.warn(`Unsupported chart type: ${this.chartData.chartType}`);
    }
    this.chartRendered = true;
  }

  private renderPieChart(
    data: SafeAnyType[],
    width: number,
    height: number,
    margin: SafeAnyType
  ): void {
    const radius =
      Math.min(
        width - margin.left - margin.right,
        height - margin.top - margin.bottom
      ) / 2;
    const pie = d3.pie().value((d: SafeAnyType) => d.votes); // Use 'votes' for the pie slice size
    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
    const labelArc = d3
      .arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    const g = this.svg
      .append('g')
      .attr(
        'transform',
        `translate(${(width - margin.left - margin.right) / 2}, ${
          (height - margin.top - margin.bottom) / 2
        })`
      );

    const arcs = g
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: SafeAnyType, i: number) => d3.schemeCategory10[i % 10]) // Use a color scheme
      .attr('class', 'cursor-pointer') //for show on hover data of each part of chart
      .append('title') //tooltip, appears on hover
      .text((d: SafeAnyType) => `${d.data.label}: ${d.data.votes} votes`); // Show votes in tooltip

    arcs
      .append('text')
      .attr(
        'transform',
        (d: SafeAnyType) => `translate(${labelArc.centroid(d)})`
      )
      .attr('dy', '.35em')
      .text((d: SafeAnyType) => d.data.label)
      .style('text-anchor', 'middle')
      .attr('class', 'text-gray-800');
  }
  private renderBarChart(
    data: SafeAnyType[],
    width: number,
    height: number,
    margin: SafeAnyType
  ): void {
    const x = d3
      .scaleBand()
      .range([0, width - margin.left - margin.right])
      .domain(data.map((d) => d.label))
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .range([height - margin.top - margin.bottom, 0])
      .domain([0, d3.max(data, (d) => d.votes) as number]); // Use 'votes' for y-axis scale

    this.svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)') // Rotate labels for readability
      .attr('class', 'text-gray-800');

    this.svg.append('g').call(d3.axisLeft(y)).attr('class', 'text-gray-800');

    this.svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar cursor-pointer')
      .attr('x', (d: SafeAnyType) => x(d.label)!)
      .attr('width', x.bandwidth())
      .attr('y', (d: SafeAnyType) => y(d.votes)) // Use 'votes' for bar height
      .attr(
        'height',
        (d: SafeAnyType) => height - margin.top - margin.bottom - y(d.votes)
      )
      .attr('fill', (d: SafeAnyType, i: number) => d3.schemeCategory10[i % 10]) // Consistent colors
      .append('title') // Add a tooltip
      .text((d: SafeAnyType) => `${d.label}: ${d.votes} votes`); // Show votes in tooltip

    // Display vote counts above bars
    this.svg
      .selectAll('.bar-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'bar-label text-gray-700')
      .attr('x', (d: SafeAnyType) => x(d.label)! + x.bandwidth() / 2)
      .attr('y', (d: SafeAnyType) => y(d.votes) - 5) // Position above the bar
      .attr('text-anchor', 'middle')
      .text((d: SafeAnyType) => d.votes);
  }

  private renderLineChart(
    data: SafeAnyType[],
    width: number,
    height: number,
    margin: SafeAnyType
  ): void {
    const x = d3
      .scaleBand() // Use scaleBand for discrete x-axis values (labels)
      .range([0, width - margin.left - margin.right])
      .domain(data.map((d) => d.label)) // Use labels for x-axis domain
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .range([height - margin.top - margin.bottom, 0])
      .domain([0, d3.max(data, (d) => d.votes) as number]); // Use 'votes' for y-axis

    this.svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)') // Rotate labels
      .attr('class', 'text-gray-800');

    this.svg.append('g').call(d3.axisLeft(y)).attr('class', 'text-gray-800');

    const line = d3
      .line()
      .x((d: SafeAnyType) => x(d.label)! + x.bandwidth() / 2) // Center the line points
      .y((d: SafeAnyType) => y(d.votes)) // Use 'votes' for y-coordinate
      .curve(d3.curveMonotoneX); // Smooth line

    this.svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add circles at data points
    this.svg
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('circle') // Uses the enter().append() method
      .attr('class', 'dot cursor-pointer') // Assign a class for styling
      .attr('cx', (d: SafeAnyType) => x(d.label)! + x.bandwidth() / 2)
      .attr('cy', (d: SafeAnyType) => y(d.votes))
      .attr('r', 5) // Radius of the dots
      .attr('fill', (d: SafeAnyType, i: number) => d3.schemeCategory10[i % 10])
      .append('title') // Add a tooltip
      .text((d: SafeAnyType) => `${d.label}: ${d.votes} votes`); // Show votes in tooltip
  }
}
