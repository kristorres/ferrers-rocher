<picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://kristorres.github.io/ferrers-rocher/images/bijection-banner-dark.png"/>
    <source media="(prefers-color-scheme: light)" srcset="https://kristorres.github.io/ferrers-rocher/images/bijection-banner.png"/>
    <img src="https://kristorres.github.io/ferrers-rocher/images/bijection-banner.png" alt="A bijection between partitions with distinct odd parts and self-conjugate partitions."/>
</picture>

Ferrers Rocher
==============

<p>
    <img src="https://img.shields.io/badge/Svelte-3-orange?style=for-the-badge&logo=svelte"/>
    <a href="https://twitter.com/ohayoukris">
        <img src="https://img.shields.io/badge/Contact-@ohayoukris-lightgrey?style=for-the-badge&logo=twitter">
    </a>
</p>

![The Ferrers Rocher web app animating the Sylvester/Glaisher bijection.](/static/images/sylvester-glaisher-bijection-example.gif)

**Ferrers Rocher** is an interactive web app where users can animate bijections
of integer partitions with Ferrers diagrams. The web app is primarily aimed at
applied mathematicians, especially professors and students in the combinatorics
and probability fields. However, it is still engaging and fun for people who are
not into math! 🙂

Background
----------

This project started off as a 10-week senior math research project under the
supervision of Prof. Stephen DeSalvo in the spring of 2014 at UCLA. The focus
was to create an app which (1) generates random partitions of a given positive
integer $n$ such that they have asymptotically $O(\sqrt{n} \log{n})$ parts with
high probability, and (2) visualizes how certain bijections affect the overall
limit shape of those partitions. The app was originally supposed to be written
in C++ using Qt, but it ultimately became a
[Java applet](http://kristorres.weebly.com/partitions.html) instead due to time
constraints.

*Ferrers Rocher* is intended to replace that applet, since Java applets were
removed from Java SE 11 in September 2018.

Math Terms: What You Need to Know
---------------------------------

  * $\mathbb Z^+$ is the set of all positive integers.
  * An **(integer) partition** of $n \in \mathbb Z^+$ is an expression of $n$
    as a sequence of parts
    $\\{\lambda_k \in \mathbb Z^+ : \sum\lambda_k = n\\}$, which are
    conventionally in decreasing order. The notation $\lambda ⊢ n$ means that
    $\lambda$ is a partition of $n$. For example,
    $\lambda = (3, 2, 2, 2, 1) ⊢ 10$.
  * A **Ferrers diagram** represents an integer partition $\lambda$ as patterns
    of dots, with the $k$-th row having the same number of dots as the $k$-th
    largest part in $\lambda$.
  * A **bijection** is a function which is one-to-one and onto.
    * A function $f$ with domain $X$ is **one-to-one** if for all $a$ and $b$ in
      $X$, whenever $a \ne b$, then $f(a) \ne f(b)$.
    * A function $f$ with domain $X$ and range $Y$ is **onto** if for all
      $y \in Y$, there is at least one $x \in X$ such that $f(x) = y$.

Building and Running Locally
----------------------------

```sh
git clone https://github.com/kristorres/ferrers-rocher
cd ferrers-rocher
pnpm install
pnpm build:dev
```

Now go to *build/index.html* on your favorite browser to view the web app. 😎

Research Papers
---------------

  * [The Nature of Partition Bijections II: Asymptotic Stability](https://www.math.ucla.edu/~pak/papers/stab5.pdf)
  * [Probabilistic Divide-and-Conquer: A New Exact Simulation Method, with Integer Partitions as an Example](https://arxiv.org/pdf/1110.3856.pdf)
  * [Improvements to Exact Boltzmann Sampling Using Probabilistic Divide-and-Conquer and the Recursive Method](https://arxiv.org/pdf/1608.07922.pdf)
